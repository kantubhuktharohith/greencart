import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe"
import User from "../models/User.js";

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res)=>{
    try {
        const { userId, items, address } = req.body;
        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }
        // Calculate amount using items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        //Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({success: true, message: "Order Placed Successfully" })
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// Place Order Stripe /api/order/stripe
export const placeOrderStripe = async (req, res)=>{
    try {
        const { userId, items, address } = req.body;
        const {origin} = req.headers;

        if(!address || items.length === 0){
            return res.json({success: false, message: "Invalid data"})
        }

        let productData = [];

        // Calculate amount using items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        //Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        // Check Stripe minimum amount (INR requires at least ₹40)
        if (amount < 40) {
            return res.json({ success: false, message: "Stripe requires a minimum order amount of ₹40. Please add more items to your cart." });
        }

        const order =await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        // Stripe Payment Intent
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        
        // create line items for stripe
        const line_items = productData.map((item)=>{
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100, // Convert to paise and add tax

                },
                quantity: item.quantity,
            }
        })

        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({success: true, url: session.url })
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}


// Stripe Webhook to Verify Payment Action : /stripe
export const stripeWebhook = async (req, res)=>{
    // Stripe Gateway Initialize 
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId, userId } = session.data[0].metadata;

            //Mark Payment as Paid
            await Order.findByIdAndUpdate(orderId, {isPaid: true})
            //Clear User Cart
            await User.findByIdAndUpdate(userId, {cartItems: []});
            break;
        }
        case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
            }


            default:
                console.error(`Unhandled event type ${event.type}`)
                break;
    }
    res.json({received: true});
}

// get orders by user ID : /api/order/user

export const getUserOrders = async (req, res)=>{
    try {
        const { userId } = req.body;
        const orders = await Order.find({ userId })
            .populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: true, message: error.message });
    }
}

// get all orders ( for seller / admin ) : /api/order/seller

export const getAllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({})
            .populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: true, message: error.message });
    }
}

// update order status (Seller/Admin) : /api/order/status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// cancel order (User) : /api/order/cancel
export const cancelOrder = async (req, res) => {
    try {
        const { orderId, userId } = req.body;
        const order = await Order.findOne({ _id: orderId, userId });
        
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }
        
        if (order.status !== 'Order Placed') {
            return res.json({ success: false, message: "Cannot cancel order at this stage." });
        }
        
        order.status = "Cancelled";
        await order.save();
        
        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}