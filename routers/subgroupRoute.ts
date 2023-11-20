// const { ensureAuthenticated } = require("../middleware/checkAuth");
import express from "express";
import * as database from "../controller/subController";
import { getUserById } from "../controller/userController";
const router = express.Router();

router.get("/list", async (req, res) => {
  // ⭐ TODO
  const subs = await database.getSubs();
  const user = await req.user;

  res.render("subs", { "title": "Subgroups", subs: subs,  "user": user } );
});

router.get("/show/:subname", async (req, res) => {
  // ⭐ TODO
  const subname = req.params.subname;
  const posts = await database.getPosts(subname);
  let postDtos: any[] = [];
  await posts.forEach(async (p) => {
    const user = await getUserById(p.creator.toString()); 
    let postDto = { ...p, createdBy: user.uname}
    postDtos.push(postDto);
  });
  const user = await req.user;

  res.render("sub", { "title": "View Subgroup", "subname": subname, "posts": postDtos, "user": user });
});

export default router;
