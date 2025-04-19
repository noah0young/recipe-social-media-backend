import model from "./model.js";
export async function findFollowingForUser(userId) {
  const following = await model.find({ from: userId }).populate("to");
  return following.map((f) => f.other);
}
export async function findFollowersForUser(userId) {
  const followers = await model.find({ to: userId }).populate("from");
  return followers.map((f) => f.user);
}
export function follow(from, to) {
  const newEnrollment = { from, to, _id: `${user}-${course}` };
  return model.create(newEnrollment);
}
export function unfollow(from, to) {
  return model.deleteOne({ from, to });
}
