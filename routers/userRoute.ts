import express from "express";
import * as database from "../controller/userController";

const router = express.Router();

router.get("/register", async (req, res) => {
  res.render("register", {"title": "Register", "user": undefined, "error": ""});
});

router.post(
  "/register", async (req, res) => {
    let uname = req.body.uname;
    let password = req.body.password;

    let user = await database.getUserByUsername(uname);
    
    if (user) {
      res.render("register", {"title": "Register", "user": undefined, "error": `User name (${uname}) already exists!`})
    } 
    else {
      user = await database.registerUser(uname, password)
      res.redirect("/auth/login-after-registration");
    }

  }
);

export default router;
