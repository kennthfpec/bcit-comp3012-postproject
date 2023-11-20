import * as db from "../fake-db";

// Make calls to your db from this file!
async function getPosts(n = 5, sub = undefined) {
  return db.getPosts(n, sub);
}

async function getPost(id: number) {
  return db.getPost(id);
}

async function addComment(postId: number, creator: number, description: string) {
  return db.addComment(postId, creator, description);
}

async function addPost(title: string, link: string, creator: number, 
  description: string, subgroup: string) {
  return db.addPost(title, link, creator, description, subgroup);
}

async function editPost(postId: number, changes?: any) {
  return db.editPost(postId, changes);
}

async function deletePost(postId: number) {
  return db.deletePost(postId);
}

export { getPosts, getPost, addComment, addPost, editPost, deletePost };
