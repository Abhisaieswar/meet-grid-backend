import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import DbConnectionManager from "../db/DbConnectionManager";
import { User } from "../db/entities/User";

const dbManager = DbConnectionManager.getInstance();

export const authenticate = async (req: any, res: any) => {
  try {
    const jwtToken = req.headers["authorization"]?.split(" ")[1];

    if (!jwtToken) res.status(401).send("Invalid Access Token");

    jwt.verify(jwtToken, "secret_key", async (error: any, payload: any) => {
      error
        ? res.status(401).send("Invalid Access Token")
        : res.status(200).send("Success");
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: err });
  }
};

export const signUp = async (req: any, res: any) => {
  try {
    const entityManager = await dbManager.getManager();

    const { userName, password } = req;

    const user = await entityManager.findOne(User, {
      where: {
        name: userName,
      },
    });

    if (user) {
      return res.status(409).json("Email already exists");
    }

    await entityManager.save(User, { name: userName, password });
    res.status(200).send("Sign up successfull!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
};

export const signIn = async (req: any, res: any) => {
  try {
    const entityManager = await dbManager.getManager();

    const { userName, password } = req.body;

    const user = await entityManager.findOne(User, {
      where: {
        name: userName,
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    const isPasswordValid = compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({
        success: false,
        message: "Invalid email or password.",
      });
    }

    //store hashed pwd in db and verify pwd
    const jwtToken = await jwt.sign({ userName }, "secret_key");
    res.status(200).json({ jwtToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err });
  }
};
