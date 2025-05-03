import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

export const generateTokenAndSaveInCookies = async (userId, res) => {
    // console.log('Token generated');
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn:"10d"
        // expires: new Date(Date.now() + 10*24*60*60*1000)    //10days expire time
    })
    res.cookie("jwt", token, {
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        path:"/"
    })
    await User.findByIdAndUpdate(userId, {token})
    return token;
}


// openssl rand -base64 32
// YwDvYp5DiMSrkurc7pbdL+NdMvlct3fB8NLJj2zv8Lk=