const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
var users = require("../public/data/users.json");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// manejamos el inicio de sesion --> la estrategia que hace el login que valida el usuario
passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (userName, password, done) => {
            const user = users.find(
                (b) =>
                    b.email.toLocaleLowerCase() === userName.toLocaleLowerCase()
            );
            try {
                console.log(userName, password, user);
                if (
                    userName.toLocaleLowerCase() ===
                        user.email.toLocaleLowerCase() &&
                    password === user.password
                ) {
                    return done(null, user, {
                        message: "Logged in Successfully",
                    });
                }
                return done(null, false, {
                    message: "User not found or Wrong Password",
                });
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: "secretkey",
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
