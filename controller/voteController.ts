import * as db from "../fake-db";

async function addVote(userId: number, postId: number, isYes: boolean) {
  db.addVote(userId, postId, isYes? +1 : -1);
}

async function removeVote(userId: number, postId: number) {
  db.removeVote(userId, postId);
}

function getVoteCount(postId: number) {
  return db.getVoteCount(postId);
}

function getVote(userId: number, postId: number) {
  return db.getVote(userId, postId);
}

export { getVote, getVoteCount, addVote, removeVote };
