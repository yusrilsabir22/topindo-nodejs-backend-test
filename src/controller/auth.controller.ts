import { NextFunction, Request, Response } from "express";
import db from "../config/db";
import { generateAccessToken, generateRefreshToken } from "../config/jwt";
import { User } from "../entity/User";

const login = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body
    const userRepo = db.getRepository(User);
    
    if(!username || !password) {
        res.status(401).json({
            error: 'fields required'
        })
        return;
    }

    const currentUser = await userRepo.findOneBy({ username })
    if(!currentUser) {
        res.status(401).json({
            error: "username or password doesn't match"
        })
        return
    }

    if(currentUser.password != password) {
        res.status(401).json({
            error: "username or password doesn't match"
        })
        return
    }

    const token = generateAccessToken(currentUser);

    // should be save to table tokens
    const refreshToken = generateRefreshToken(currentUser);

    res.json({
        token
    })
}

export {
    login
}