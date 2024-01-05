import express from "express";
import { signIn, signUp, authenticate } from "../controllers/auth";

const router = express.Router();

router.post("/signIn", signIn);

router.get("/authenticate", authenticate);

router.post("/signUp", signUp);

export = router;
