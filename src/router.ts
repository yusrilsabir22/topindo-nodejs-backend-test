import { Router } from "express";
import { deleteUser, getListUser, getUserById, saveUser, updateUser } from "./controller/user.controller";

const router = Router()

router.get('/user', getListUser)
router.get('/user/:id', getUserById)
router.post('/user', saveUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router;