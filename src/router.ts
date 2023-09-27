import { Router } from "express";
import { getListUser, saveUser } from "./controller/user.controller";

const router = Router()

router.get('/user', getListUser)
router.post('/user', saveUser)

export default router;