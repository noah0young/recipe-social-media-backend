import model from "./model.js";
export async function findFollowingForUser(userId) {
  const following = await model.find({ from: userId }).populate("to");
  return following.map((f) => f.to);
}
export async function findFollowersForUser(userId) {
  const followers = await model.find({ to: userId }).populate("from");
  return followers.map((f) => f.from);
}
export function follow(from, to) {
  const newFollow = { from, to, _id: `${from}-${to}` };
  return model.create(newFollow);
}
export function unfollow(from, to) {
  return model.deleteOne({ from, to });
}
export async function amFollowing(from, to) {
  const followBetween = await model.findOne({ from, to });
  console.log("followBetween = ");
  console.log(followBetween);
  return !!followBetween;
}
