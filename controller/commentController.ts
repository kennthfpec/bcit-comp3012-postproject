import * as db from "../fake-db";

async function getComment(id: number) {
  return db.getComment(id);
}

async function deleteComment(id: number) {
  return db.deleteComment(id);
}
export { getComment, deleteComment };
