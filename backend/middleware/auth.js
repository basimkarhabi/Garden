
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// auth used to authenticate the user if token okay we continue if not token is valid 
module.exports = async (req , res , next)=>{
   
    console.log('req.cookies:  ',req.cookies)
    const token = req.cookies !== undefined ? req.cookies.token : req.headers.cookie.split('=')[1] ;
    if(!token){
       return res.status(400).json({ msg : 'no Token , authorization denied! '})
    }
    try {
        const user = jwt.verify(token , process.env.JWT_SECRET);
        console.log('user ', user);
        req.id = user.id;
        const currentUser = await User.findById(user.id).select('-password');
        if(!currentUser){
         return   res.status(400).json({ msg : ' the user with the current token is no longer exist'})
        }
        req.user = currentUser;
        console.log(req.user)
        next();

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg : 'Token is not Valid'})
        
    }


}