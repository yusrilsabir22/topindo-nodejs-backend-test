import { NextFunction, Request, Response } from "express";
import db from '../config/db'
import { User } from "../entity/User";

const getListUser = async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = db.getRepository(User);
    const users = await userRepo.find()
    res.json({ data: users })
}

export {
    getListUser
}