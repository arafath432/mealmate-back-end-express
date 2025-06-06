const passport = require('passport');
require('dotenv').config();
const User = require('../model/users.signupSchema');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {
    try{
        const user = await User.findOne({_id: jwt_payload.id});
        if (user) {
            return done(null, user);
        }
         else {
            return done(null, false);
            
        }
    }catch(err){

        if (err) {
            return done(err, false);
        }

    }
}));