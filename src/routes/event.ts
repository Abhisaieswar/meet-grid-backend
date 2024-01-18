import express from "express";
import { createEvent } from "../controllers/event";
const router = express.Router();

router.post("/createEvent", createEvent);

export = router;
