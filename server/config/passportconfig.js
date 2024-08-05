// passportConfig.js
import passport from 'passport';
import User from '../models/user.js';

const customPassport = passport;
customPassport.use(User.createStrategy());
customPassport.serializeUser(User.serializeUser());
customPassport.deserializeUser(User.deserializeUser());


export default customPassport;