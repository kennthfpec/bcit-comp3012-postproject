import * as db from "../fake-db";

// Make calls to your db from this file!
async function getSubs() {
  const allSubs: string[] = await db.getSubs();
  return allSubs.sort();
}

async function getPosts(subname: string) {
  const posts = await db.getPosts().filter(p => p.subgroup == subname)
  return posts.sort((a, b) => b.timestamp - a.timestamp);
}

export { getSubs, getPosts };
