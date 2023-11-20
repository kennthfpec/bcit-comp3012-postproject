// @ts-nocheck
import express from "express";
import * as database from "../controller/postController";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { getUserById } from "../controller/userController";

router.get("/", async (req, res) => {
  const posts = await database.getPosts(20);
  posts.forEach(async (p) => {
    const user = await getUserById(p.creator); 
    p.createdBy = user.uname;
  });
  const user = await req.user;
  res.render("posts", { "title": "Posts", posts, user });
});

router.get("/create", ensureAuthenticated, async (req, res) => {
  const user = await req.user;
  res.render("createPosts", { "title": "Create Post", "user": user });
});

router.post("/create", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO  
  let post = await database.addPost(req.body.title, req.body.link, 
    req.body.creator, req.body.description, req.body.subgroup);
  res.redirect("/posts/show/" + post.id);
});

router.get("/show/:postid", async (req, res) => {
  // ⭐ TODO
  let post = await database.getPost(Number(req.params.postid).valueOf());
  post.comments.sort((c1, c2) => c2.timestamp - c1.timestamp);
  const user = await req.user;
  res.render("individualPost", { "title": "View Post", "post": post, "user": user});
});

router.get("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const user = await req.user;
  let post = await database.getPost(Number(req.params.postid).valueOf());
  res.render("editPost", { "title": "Edit Post", "post": post, "user": user });
});

router.post("/edit/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  let post = await database.getPost(Number(req.params.postid).valueOf());
  let changes = {};

  if (post.title !== req.body.title) {
    changes["title"] = req.body.title;
  }

  if (post.link !== req.body.link) {
    changes["link"] = req.body.link;
  }

  if (post.subgroup !== req.body.subgroup) {
    changes["subgroup"] = req.body.subgroup;
  }

  if (post.description !== req.body.description) {
    changes["description"] = req.body.description;    
  }

  await database.editPost(post.id, changes);
  res.redirect("/posts/show/" + post.id);
});

router.get("/deleteconfirm/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const user = await req.user;
  let post = await database.getPost(Number(req.params.postid).valueOf());
  if (user.id == post.creator.id) {
    res.render("deleteConfirmPost", { "title": "Delete Confirm Post", "post": post, "user": user });
  }
  else {
    res.redirect("/posts/show/" + post.id);
  }
});

router.post("/delete/:postid", ensureAuthenticated, async (req, res) => {
  // ⭐ TODO
  const postId = req.params.postid;
  await database.deletePost(postId);

  res.redirect("/posts");
});

router.post(
  "/comment-create/:postid",
  ensureAuthenticated,
  async (req, res) => {
    // ⭐ TODO
    const postId = req.params.postid;
    const creator = req.body.creator;
    const description = req.body.description;

    if (description && description.length > 0) {
      const comment = await database.addComment(postId, creator, description);
      res.redirect("/posts/show/" + postId);
    }
  }
);

export default router;
