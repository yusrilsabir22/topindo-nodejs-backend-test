import { Router } from "express";
import { getListUser, getUserById, saveUser } from "./controller/user.controller";

const router = Router()

router.get('/user', getListUser)
router.get('/user/:id', getUserById)
router.post('/user', saveUser)

export default router;