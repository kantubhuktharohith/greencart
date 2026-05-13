import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';


export const register = async (req,res)=>{
    try{
            const { name, email, password } = req.body;

            if(!name || !email || !password){
                return res.json({success: false, message: 'Missing Details'})
            }

            const existingUser = await User.findOne({email})

            if(existingUser)
                return res.json({success: false, message: 'User already exists'})

            const  hashedPassword = await bcrypt.hash(password, 10)

            const user = await User.create({name, email, password: hashedPassword})

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})

            res.cookie('token', token, {
                httpOnly: true, 
                secure: true, 
                sameSite: 'none', 
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                })
                return res.json({success: true, token, user: {_id: user._id, email: user.email, name: user.name, cartItems: user.cartItems}})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message });
    }
}


export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.json({success: false, message: 'Email and password are required'});
        const user = await User.findOne({email});

        if(!user){
            return res.json({success: false, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch)
            return res.json({success: false, message: 'Invalid email or password'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})

            res.cookie('token', token, {
                httpOnly: true, 
                secure: true, 
                sameSite: 'none', 
                maxAge: 7 * 24 * 60 * 60 * 1000, 
                })
                return res.json({success: true, token, user: {_id: user._id, email: user.email, name: user.name, cartItems: user.cartItems}})

    } catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message });
    }
}

// check auth :/api/user/is-auth
export const isAuth = async (req, res)=>{
    try {
        console.log('Auth check - req.body:', req.body);
        console.log('Auth check - req.cookies:', req.cookies);

        const { userId } = req.body;
        if(!userId) {
            console.log('No userId found in request');
            return res.json({success: false, message: 'User not authenticated'})
        }

        console.log('Looking up user with ID:', userId);
        const user = await User.findById(userId).select("-password")
        if(!user) {
            console.log('User not found in database');
            return res.json({success: false, message: 'User not found'})
        }

        console.log('User found:', { id: user._id, email: user.email, name: user.name });
        return res.json({success: true, user})

    } catch (error) {
        console.log('Auth check error:', error.message);
        res.json({success: false, message: error.message });
    }
}


//Logout User : /api/user/logout
export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message });
    }
}

// Update User Profile : /api/user/profile
export const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, location } = req.body;

        if (!name || name.trim() === '') {
            return res.json({ success: false, message: "Name is required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: name.trim(), phone: phone || '', location: location || '' },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}