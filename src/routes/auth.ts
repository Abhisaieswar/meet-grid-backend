import express from "express";
import { check } from "express-validator";
import { signIn, authenticate } from "../controllers/auth";

const router = express.Router();

router.post(
  "/signIn",
  [
    check("email", "A valid email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 1 }),
  ],
  signIn
);

router.get("/authenticate", authenticate);

export = router;
