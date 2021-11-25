const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/auth.js')
router.use(cookieParser());



// Get the current authenticated user
router.get('/auth' , auth , (req ,res )=> {
    try {
        const user = req.user ; 
        res.json({user , msg :'User Authentication successfully!' } );
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg : 'Server Error'});
        
    }

})


// dashboard 
router.get('/dashboard' ,auth , (req, res)=>{
try {
    return res.json({'user' : req.user , msg : 'token is ok'})
    
} catch (error) {
    res.status(500).json( ' Server Error');
    
    
}
});

// logout user 
router.get('/logout' , (req, res)=>{
    res.clearCookie('token')
    res.json({ success: true})
})


// sign up
router.post('/create',async (req, res)=>{
    // save a user
    const {email , password , username } = req.body;
    let user = await User.findOne({  email});
    if(user){
        return res.status(400).json({ msg : ' User already exist'})
    }
    user = new User({
        email,
        password,
        username
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password , salt );
    await user.save();

    res.json({ user})

  
});

// checking token 
router.get('/jwtToken' , (req , res)=>{
    console.log(req.cookies.token);
    if(req.cookies.token){
        res.json({ token : req.cookies.token})
    }
    else{
        res.json({ msg : 'no token '})
    }

})

// Signin using JWT 
router.post('/signinByJWT',async (req, res)=>{
    const {email , password } = req.body;
    const user =await User.findOne({ email});
    if(!user){
     return res.status(400).json({ msg:" invalid Email!!"})
     //                             from user, from database 
    } 
    console.log(user.email);                       
     const isMatch = await bcrypt.compare(password,user.password )
     if(!isMatch){
        return res.status(400).json({ msg:" invalid password!!"})
         
     }
     // email and passeord are correct 
     const secret = process.env.JWT_SECRET
     const token = jwt.sign( {id: user._id} , secret,{expiresIn: '1d' });
     //const token = { token : "123"}
     console.log(token);
     res.cookie('token' , token , { httpOnly : true});
     res.json({token});

  
    
    // token = jwt.sign(payload/data, secret key)
   ;// check ur .env file for this
    // encode with sign()
    // User.findOne({email: req.body.email, password: req.body.password}, (err, user)=>{
    //    const token = jwt.sign({userid: user._id}, secret, {
    //        expiresIn: '1d'
    //    });
    //    res.json(token);
    // })
    // const token = jwt.sign(data, secret, {
    //     expiresIn: '1d'// 60*60*24
    // });
    // res.json(token);
    // for decode and verify the data
})

// Get the JWT user from the token
router.post('/jwt/getUser', (req, res)=>{
    const userToken = req.body.userToken;
    // verify the token
    jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) throw res.json('Token expire');
        User.findById(decoded.userid, (err, user)=> {
        res.json(user)
       })
    })
})


// sign in and save data to localstorage of frontend
router.post('/signin',(req, res)=>{
    // check a user
    const {email, password} = req.body;
    User.findOne({email, password}, (err, data)=> {
        res.json(data)
    })

})

router.post('/getUser', (req, res)=>{
    User.findById(req.body.id, (err, user)=>{
        res.json(user);
    })
})

// Test queries
router.get('/test/queries', (req, res)=>{
    // find all users
    // User.find((err, users)=> {
    //     res.json(users);
    // })
    // find the user called "Jose"
    // method 1
    // User.findOne({username: 'Jose'},(err, users)=> {
    //     res.json(users);
    // })
    // method 2
    // User.find((err, users)=> {
    //     res.json(users);
    // }).where('username').equals('Jose')

    // find all user's email only
    // User.find((err, users)=> {
    //     res.json(users);
    // }).select(['email', 'password'])

    //find all users ascending order and only show 3 users
    User.find((err, users)=> {
        res.json(users);
    }).sort({_id: -1}).limit(3)
})

module.exports = router;

