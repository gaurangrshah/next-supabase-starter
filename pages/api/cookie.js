export default async function handler(req, res) {
  // @SCOPE:  set authToken cookie to request object
  return res.setHeader("Set-Cookie", [
    serialize("sb:token", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);
}
