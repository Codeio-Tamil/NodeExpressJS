import express from "express";
import routes from "./routes/router.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import {users} from "../src/utils/constants.mjs"

const app = express();
app.use(express.json());
app.use(cookieParser("code io"));

app.use(
    session({
        secret: "romba secret",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000* 60,
        }
    }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    {usernameField: "user_name", passwordField: "password"},
    (user_name, password, done)=>{
    const user = users.find((user)=>user.user_name==user_name);
    if(!user){
        return done(null, false, {message: "Invalid username"});
    }
    if(user.password !== password){
        return done(null, false, {message: "Incorrect Password"});
    }
    return done(null, user);
}) );

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    const user = users.find((u)=>u.id === id);
    done(null, user||false);
})

app.use(routes);

const PORT = 3000;

app.get("/", (req, res)=>{
    res.cookie("user", "Admin", {maxAge: 60000 * 60, signed: true});
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(sessionData);
        }
    })
    res.send({msg: "Root"});
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info?.message || "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

app.listen(PORT, ()=>{
    console.log(`App is running on Port ${PORT}`);
});
