import { NextFunction, Request, Response } from "express";
import db from '../config/db'
import { User } from "../entity/User";

const getListUser = async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = db.getRepository(User);
    const users = await userRepo.find()
    res.json({ data: users })
}

const saveUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, name, age, address, phoneNumber } = req.body
    const userRepo = db.getRepository(User);
    if (!username || !password || !name || !age || !address || !phoneNumber) {
        res.json({
            error: 'fields required'
        })
        return
    }

    const user = new User()
    user.username = username
    user.password = password
    user.name = name
    user.address = address
    user.age = age
    user.phoneNumber = phoneNumber
    const savedUser = await userRepo.save(user)
    res.json({
        user: savedUser
    })
}

export {
    getListUser,
    saveUser
}