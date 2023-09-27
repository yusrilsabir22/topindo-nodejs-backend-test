import { NextFunction, Request, Response } from "express";
import db from "../config/db";
import { generateAccessToken, generateRefreshToken } from "../config/jwt";
import { User } from "../entity/User";

const login = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Login authentication']
    // #swagger.description = "Retrieve access token"

    /**
     * #swagger.parameters['body'] = {
            in: 'body',
            description: '',
            schema: {
                $username: 'admin',
                $password: 'admin',
            }
        }
     */

    const {username, password} = req.body
    const userRepo = db.getRepository(User);
    
    if(!username || !password) {
        /* #swagger.responses[400] = {
            schema: { $error: 'fields required' },
            description: ''
        } */
        res.status(400).json({
            error: 'fields required'
        })
        return;
    }

    const currentUser = await userRepo.findOneBy({ username })
    if(!currentUser) {
        /* #swagger.responses[401] = {
            schema: { $error: "username or password doesn't match" },
            description: ''
        } */
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
    
    /* #swagger.responses[200] = {
        schema: { $token: 'token-abcd' },
        description: ''
    } */

    res.json({
        token
    })
}

export {
    login
}