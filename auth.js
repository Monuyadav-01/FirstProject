
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const Person = require('./models/Person')
  passport.use(new localStrategy(async (username, password, done) => {
    try {
        console.log(`Received:`, username, password);
        const user = await Person.findOne({username});
        if (!user)
            return done(null, false, { message: "Incorrect username" });
                const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Invalid username and password' });
        }
    } catch (error) {
        console.log(error);
        return done(error);
    }
}));
module.exports = passport