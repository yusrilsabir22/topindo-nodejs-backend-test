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

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const userRepo = db.getRepository(User);
    const user = await userRepo.findOne({
        where: {
            id: parseInt(id)
        }
    })
    res.json({ user })
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userRepo = db.getRepository(User);
    const id = req.params.id
    const { name, age, address, phoneNumber } = req.body

    if (!id || !name || !age || !address || !phoneNumber) {
        res.json({
            error: 'fields required'
        })
        return
    }

    const currentUser = await userRepo.findOneBy({
        id: parseInt(id)
    })

    if (!currentUser) {
        res.json({
            error: 'user not found'
        })
        return
    }

    currentUser.name = name
    currentUser.age = age
    currentUser.address = address
    currentUser.phoneNumber = phoneNumber
    await userRepo.save(currentUser)
    res.json({
        user: currentUser
    })
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    if (!id) {
        res.json({
            error: 'id required'
        })
        return
    }

    const userRepo = db.getRepository(User);
    const currentUser = await userRepo.findOneBy({
        id: parseInt(id)
    });

    if (!currentUser) {
        res.json({
            error: 'user not found'
        })
        return;
    }

    await userRepo.remove([currentUser])
    res.json({
        message: `success to delete user with id ${id} and name ${currentUser.name}`
    })
}

export {
    getListUser,
    getUserById,
    saveUser,
    updateUser,
    deleteUser
}