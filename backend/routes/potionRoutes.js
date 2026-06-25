import express from "express";
import potionController from "../controllers/potionController.js";

const router = express.Router();

router.get("/potions", potionController.findAll);
router.get("/potions/:id", potionController.findById);
router.post("/potions", potionController.create);
router.delete("/potions/:id", potionController.deleteById);

export default router;
