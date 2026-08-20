  module.exports.isLoggedIn = (req, res, next) =>{
  if(!req.isAuthenticated()){
    req.flash("error", "Login to add a listing!");
    return res.redirect("/login");
  }
  next();
}