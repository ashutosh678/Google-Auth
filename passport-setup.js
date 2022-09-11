const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("./database")

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback:true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    
    const email = profile._json.email;

    const list = new User({
        name:profile._json.given_name,
        last_name:profile._json.family_name,
        email:profile._json.email,
        domain:profile._json.domain
    });

    const userExists = await User.findOne({email});
    if(userExists){
        console.log("user already exists");
    }else{
        list.save();
    }

    


    return done(null, profile);
  }
));