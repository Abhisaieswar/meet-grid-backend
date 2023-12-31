import { hash, compare } from "bcryptjs";
import { validationResult } from "express-validator";
import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

export const authenticate = async (req: any, res: any) => {
  const jwtToken = req.headers["authorization"]?.split(" ")[1];

  if (jwtToken === undefined) {
    res.status(401);
    res.send("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "secret_key", async (error: any, payload: any) => {
      if (error) {
        res.status(401);
        res.send("Invalid Access Token");
      } else {
        res.status(200);
        res.send("Success");
      }
    });
  }
};

export const signIn = async (req: any, res: any) => {
  const { userName, password } = req.body;
  // const hashedPwd = await bcrypt.hash(password, 10);
  //store hashed pwd in db and verify pwd
  const jwtToken = await jwt.sign({ userName }, "secret_key");
  res.json({ jwtToken });
};
