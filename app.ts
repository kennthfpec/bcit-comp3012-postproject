import express from "express";
import session from "express-session";
import passport from "./middleware/passport";
const PORT = process.env.PORT || 8000;

const app = express();
const expressLayouts = require('express-ejs-layouts')

app.set("trust proxy", 1);
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS Required
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import indexRoute from "./routers/indexRoute";
import authRoute from "./routers/authRoute";
import postRoute from "./routers/postRoute";
import subgroupRoute from "./routers/subgroupRoute";
import commentRoute from "./routers/commentRoute";
import voteRoute from "./routers/voteRoute";
import * as database from "./controller/voteController";
import userRoute from "./routers/userRoute";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.formatTimestamp = (timestamp: number) => (new Date(timestamp)).toLocaleDateString();
  res.locals.getVoteCount = (postId: number) => database.getVoteCount(postId);
  res.locals.getVote = (userId: number, postId: number) => {
    const vote = database.getVote(userId, postId);
    return vote;
  }
  next();
})
app.use("/auth", authRoute);
app.use("/comments", commentRoute);
app.use("/posts", postRoute);
app.use("/subs", subgroupRoute);
app.use("/users", userRoute)
app.use("/votes", voteRoute)
app.use("/", indexRoute);

app.listen(PORT, () =>
  console.log(`server should be running at http://localhost:${PORT}/`)
);
