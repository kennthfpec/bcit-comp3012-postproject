// @ts-nocheck
import express from "express";
import * as database from "../controller/commentController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { getUserById } from "../controller/userController";

router.get("/show/:commentid", async (req, res) => {
  // ⭐ TODO
  let comment = await database.getComment(Number(req.params.commentid).valueOf());
  const user = await req.user;
  res.render("viewComment", { "title": "View Comment", "comment": comment, "user": user});
});

router.get("/deleteconfirm/:commentid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const user = await req.user;
  let comment = await database.getComment(Number(req.params.commentid).valueOf());
  if (comment && comment.creator && user.id == comment.creator.id) {
    res.render("deleteConfirmComment", { "title": "Delete Comment", "comment": comment, "user": user });
  }
  else {
    res.redirect("/comments/show/" + comment.id);
  }
});

router.post("/delete/:commentid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const commentId = req.params.commentid;
  await database.deleteComment(commentId);

  res.redirect("/posts/show/" + req.body.postId);
});

export default router;
