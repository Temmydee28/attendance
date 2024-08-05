import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = 8000;

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());


const myConnectionUrl = process.env.MONGODB_CONNECT_URL;

mongoose.connect(myConnectionUrl,{ useNewUrlParser:true })
.then(()=>{

    console.log('connected to mongodb Database')

})
.catch((error)=>{
console.log(`Error connecting to mongoDB:${error}`)
});

const userSchema = new mongoose.Schema({
    username:String,
    fullname:String,
    matricNumber:String,
    password:String
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

const User = new mongoose.model("User",userSchema);


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// Handle React SPA (Single Page Application)
app.get("/", cors(), (req,res)=>{

})

app.post("/signup", async(req ,res)=>{

    const receivedData = req.body;
    const {fullname,username, matricNumber, password } = receivedData;

    User.register({username:username, fullname: fullname, matricNumber: matricNumber}, password, function(err, user) {
            if (err) { 
                console.log(err);
                res.status(400).json({ status: 'failure', message: 'cannot register, try again' });
             } else{
                passport.authenticate('local')(req, res, function(){
                    res.status(201).json({ status: 'success', message: 'User registered',user });
                })
             }
            })
        
     
    
});


    app.post("/", passport.authenticate("local", {

        if(successRedirect){
            res.status(201).json({ status: 'success', message: 'User registered' });
        },
        failureRedirect: "/",
        failureFlash: true, // Enable if you want to use flash messages for errors
    }));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
