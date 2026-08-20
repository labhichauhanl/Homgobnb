const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const router = express.Router();

router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync (async(req, res) =>{
    try{
        let {username, email, password} = req.body;
    const newUser = new User ({email, username});
    const registeredUser = await User.register(newUser, password);
    req.flash("success", "Welcome to Homgobnb");
    res.redirect("/listings");
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

    router.get("/login", (req, res) =>{
        res.render("users/login.ejs");
    })

    router.post("/login", passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
        async(req, res) =>{
        res.flash("success","Welcome to Homgobnb!");
        res.redirect("/listings");
    })

module.exports = router;