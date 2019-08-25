import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import { ComparePassword } from '../utils/security/password';
import queries from '../db';

// if logged in and have token this adds req.user(user) on the requests
passport.serializeUser((user, done) => done(null, user));
// if logged out and nolonger have token it removes the req.user(user) from the requests
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    session: false
}, // email and password are provided by the user at login on frontend
    async (email, password, done) => {
        try {
            let [user]: any = await queries.Users.findOneByEmail(email);
            if (user && ComparePassword(password, user.password)) {
                // extra layer of security
                // delete user.password;
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            done(err);
        }
    }));
