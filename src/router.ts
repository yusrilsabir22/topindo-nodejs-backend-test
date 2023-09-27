import { Router } from "express";
import { getListUser } from "./controller/user.controller";

const router = Router()

router.get('/user', getListUser)

export default router;