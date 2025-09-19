import { Router } from "express";
import productsRouter from "../routes/products.mjs"
import usersRouter from "../routes/users.mjs"

const router = Router()

router.use(productsRouter);
router.use(usersRouter);

export default router;