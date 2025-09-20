import express from "express";
import routes from "./routes/router.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import {User} from "../src/mongoose/schema/user.mjs"
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cookieParser("code io"));

mongoose.connect('mongodb://localhost/express')
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(`Error: ${err}`));

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
    async (user_name, password, done)=>{
    try{
        const user = await User.findOne({user_name: user_name});
        if(!user){
            return done(null, false, {message: "Invalid username"});
        }
        if(user.password !== password){
            return done(null, false, {message: "Incorrect Password"});
        }
        return done(null, user);
    }catch(err){
        console.log(err);
        return done(err, false);
    }
    
}) );

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    try{
        const user = await User.findById(id);
        done(null, user);
    }
    catch(err){
        console.log(err);
        done(err, false);
    }
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
