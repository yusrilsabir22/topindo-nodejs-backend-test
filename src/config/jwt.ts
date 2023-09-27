import {config} from 'dotenv'
import { User } from '../entity/User'
import jwt, { JwtPayload } from 'jsonwebtoken'

config()

const { 
    JWT_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY,
    JWT_ACCESS_TOKEN_EXPIRED, 
    JWT_REFRESH_TOKEN_EXPIRED 
} = process.env

const generateToken = (user: User, exp: string, secret = JWT_SECRET_KEY) => {
    return jwt.sign({ userId: user.id }, secret!, {expiresIn: exp})
}

const generateAccessToken = (user: User) => {
    return generateToken(user, JWT_ACCESS_TOKEN_EXPIRED!)
}

const generateRefreshToken = (user: User) => {
    return generateToken(user, JWT_REFRESH_TOKEN_EXPIRED!, JWT_REFRESH_SECRET_KEY)
}

const isAccessTokenValid = (token: string) => {
    return jwt.verify(token, JWT_SECRET_KEY!)
}

const isRefreshTokenValid = (token: string) => {
    return jwt.verify(token, JWT_REFRESH_SECRET_KEY!)
}

const isTokenExpired = (claim: JwtPayload) => {
    if (claim.exp! > (new Date().getTime() / 1000)) {
        throw new Error('Token expired')
    }
}

export {
    generateAccessToken,
    generateRefreshToken,
    isAccessTokenValid,
    isRefreshTokenValid,
    isTokenExpired
}