import { NextFunction, Request, Response } from "express";
import { isAccessTokenValid } from "./config/jwt";

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }
    try {
        const claims = isAccessTokenValid(token.replace('Bearer ', ''))
        req['user'] = claims;
        next();
    } catch (err) {
        console.log(err)
        return res.status(403).json({ message: 'Invalid access token' });
    }
}

export {
    verifyAccessToken
}