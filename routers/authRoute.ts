import express from "express";
import passport from "../middleware/passport";
const router = express.Router();

router.get("/login", async (req, res) => {
  res.render("login", {"title": "Login", "user": undefined, "message": ""});
});

router.get("/login-after-registration", async (req, res) => {  
  res.render("login", {"title": "Login", "user": undefined, "message": "Your account is created successfully!"});
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
});

export default router;
