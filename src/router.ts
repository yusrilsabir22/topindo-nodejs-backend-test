import { Router } from "express";
import { login } from "./controller/auth.controller";
import { deleteUser, getListUser, getUserById, saveUser, updateUser } from "./controller/user.controller";
import { verifyAccessToken } from "./middleware";

const router = Router()

router.get('/user', verifyAccessToken, getListUser)
router.get('/user/:id', verifyAccessToken, getUserById)
router.post('/user', verifyAccessToken, saveUser)
router.patch('/user/:id', verifyAccessToken, updateUser)
router.delete('/user/:id', verifyAccessToken, deleteUser)

router.post('/login', login)

export default router;