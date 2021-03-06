const express = require('express');
const app = express();
const cors = require('cors')
const plantRouter = require('./routes/plant')
const userRouter = require('./routes/user')
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// pass passport npm package into config/passport.js
//require('./config/passport')(passport);
//app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000",
               methods:['POST','GET']
}));
// Mongodb connection using mongoose module




mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.MONGO_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> console.log('MongoDB database is Successfully connected'))
.catch(()=> console.log('Database connection failed!'))

// Passport js settings
app.use(passport.initialize()); // serialize user.id
app.use(passport.session()); // deserialize user data

app.use(express.static(__dirname+ '/public'));
app.use(express.json())
app.use('/user' , userRouter);
app.use('/plant' ,plantRouter )

// Send email from customers by contactus
// app.post('/backend/sendEmail', (req, res)=>{
//     const {username, message, email} = req.body;
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     const msg = {
//         to: 'mac.fira@gmail.com', // where to send the email
//         from: 'ariful.islam@digitalcareerinstitute.org', // Official Verified email of your website/company
//         templateId: process.env.SENDGRID_TEMPLATE_ID,
//         //subject: 'Email system test by sendgrid',
//         dynamicTemplateData: {
//             username,
//             message,
//             email,
//             subject: 'Email system test by sendgrid'
//         }
//         // html: `
//         // <h2>Hi, Mr ${username}. send you a message.</h2>
//         // <p>Message is: ${message}</p>
//         // <h3>User email: ${email} </h3>
//         // `
//     }
//     sgMail
//     .send(msg)
//     .then(()=>{
//         console.log('Email Successfully send!')
//         res.json('Email Successfully send! Thanks.')
//     })
//     .catch(err=> console.log(err))
// })

// app.post('/signin/passport/local', passport.authenticate('local'), (req, res)=> {
//     console.log(req.user) // done(null, user)
//     res.send(req.user)
// });

// // Github login process
// // ask github to give me some data
// app.get('/signin/passport/github', passport.authenticate('github'));
// // receive the github callback result
// app.get('/auth/github/callback', passport.authenticate('github', {
//     failureRedirect: 'http://localhost:3000'
// }),(req, res)=>{
//     console.log(req.user) // user from passport done() callback
//     res.redirect('http://localhost:3000/profile/'+req.user._id)
// })

// // Facebook authentication
// app.get('/signin/passport/facebook', passport.authenticate('facebook'));
// app.get('/signin/passport/facebook/callback', passport.authenticate('facebook', {
//     failureRedirect: 'http://localhost:3000'
// }),(req, res)=>{
//     res.redirect('http://localhost:3000/profile/'+req.user._id)
// })

// // passport logout session, remove req.user
// app.get('/passport/logout', function(req, res){
//     req.logout();
//     res.redirect('http://localhost:3000/signinformPassport');
// });

// app.use('/plant', plantRouter);
// app.use('/user', userRouter);

app.listen(5000, ()=>{
    console.log('Backend is running on port 5000')
})


