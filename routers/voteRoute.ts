// @ts-nocheck
import express from "express";
import * as database from "../controller/voteController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.post("/vote-yes/:postid", ensureAuthenticated, async (req, res) => {
  const user = await req.user;
  const postId = +req.params.postid;
  const undo = req.body.undo == 'true';
  
  if (undo) {
    await database.removeVote(user.id, postId);
  }
  else {
    await database.addVote(user.id, postId, true);
  }

  res.redirect(req.headers.referer);
});

router.post("/vote-no/:postid", ensureAuthenticated, async (req, res) => {
  const user = await req.user;
  const postId = req.params.postid;
  const undo = req.body.undo == 'true';
  
  if (undo) {
    await database.removeVote(user.id, postId);
  }
  else {
    await database.addVote(user.id, postId, false);
  }

  res.redirect(req.headers.referer);
});


export default router;