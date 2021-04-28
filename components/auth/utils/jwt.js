import jwt from "jsonwebtoken";


export async function verifyToken(token) {
  if (token) {
    const decodedToken = await jwt.decode(token); // getdecoded token value
    //❌ return decodedToken && new Date().getTime() < expiresAt ? decodedToken : undefined;
    if (decodedToken) {
      const expiresAt = decodedToken.exp * 1000; // get expiresAt time in milliseconds
      // if decodedToken exists make sure token isn't expired and return token, else return undefined
      if (new Date().getTime() < expiresAt) {
        // return decodedToken;
        console.log("token decoded", true);
        // @NOTE:  token refresh known issue on localhost -- should work as expected in production
        // https://github.com/supabase/gotrue-js/issues/32#issuecomment-761416934
        return true;
      }
    } else {
      console.log("token not decoded...");
    }

    return undefined;
  }
}
