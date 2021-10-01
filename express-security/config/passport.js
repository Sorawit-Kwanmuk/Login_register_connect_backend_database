const { User } = require('../models');
//config passport-jwt
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
//config jwt strategy options
const options = {
  secretOrKey: process.env.JWT_SECRET_KEY, //define secret key to verify token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //define where to extract jwt from
};
//verify token
//if success execute callback function (payload,done) => payload is token payload, done is callback function
//if invalid token sent response with status code 401 and error message Unauthorized
const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    console.log('payload', payload);
    const user = await User.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      return done(null, false);
    }
    //done has 2 parameter:error, user
    done(null, 'Success Token Verification'); // req.user = 'Success Token Verification'; next();
  } catch (error) {
    done(error, false);
  }
});

//apply jwt strategy to passport
passport.use('jwt', jwtStrategy);
