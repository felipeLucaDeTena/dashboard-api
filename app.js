/* eslint-disable no-unused-vars */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");

var bookingsRouter = require("./routes/booking.routes");
var contactRouter = require("./routes/contact.routes");
var roomsRouter = require("./routes/room.routes");
var usersRouter = require("./routes/users.routes");
var auth = require("./routes/auth.routes");

require("./auth/passport");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", auth);
app.use(
    "/bookings",
    passport.authenticate("jwt", { session: false }),
    bookingsRouter
);
app.use(
    "/contact",
    passport.authenticate("jwt", { session: false }),
    contactRouter
);
app.use(
    "/rooms",
    passport.authenticate("jwt", { session: false }),
    roomsRouter
);
app.use(
    "/users",
    passport.authenticate("jwt", { session: false }),
    usersRouter
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
