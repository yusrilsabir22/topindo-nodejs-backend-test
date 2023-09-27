import { NextFunction, Request, Response } from "express";
import db from '../config/db'
import { User } from "../entity/User";

const getListUser = async (req: Request, res: Response, next: NextFunction) => {

    // #swagger.tags = ['Get All User']
    // #swagger.description = "Retrieve all user"

    const userRepo = db.getRepository(User);
    const users = await userRepo.find()

    /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/User" },
        description: '' 
    } */
    res.json(users)
}

const saveUser = async (req: Request, res: Response, next: NextFunction) => {

    // #swagger.tags = ['Save User']
    // #swagger.description = "Save user to database"
    /**
     * #swagger.parameters['parameter_name'] = {
            in: 'body',
            description: '',
            schema: {
                $username: 'admin',
                $password: 'admin',
                $name: 'Jhon Doe',
                $address: 'Bandung',
                $age: 29,
                $phoneNumber: '081234567890',
                about: ''
            }
        }
     */

    const { username, password, name, age, address, phoneNumber } = req.body
    const userRepo = db.getRepository(User);
    if (!username || !password || !name || !age || !address || !phoneNumber) {
        /* #swagger.responses[400] = {
            schema: { $error: 'fields required' },
            description: ''
        } */
        res.status(400).json({
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

    /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/User" },
        description: '' 
    } */
    res.json(user)
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {

    // #swagger.tags = ['Get User By ID']
    // #swagger.description = "Retrieve one user with defined ID"
    /**
     * #swagger.parameters['id'] = {
            in: 'params',
            description: '',
            type: 'integer'
        }
     */
    const id = req.params.id
    const userRepo = db.getRepository(User);
    const user = await userRepo.findOne({
        where: {
            id: parseInt(id)
        }
    })

    /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/User" },
        description: '' 
    } */
    res.json(user)
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {

    // #swagger.tags = ['Update User By ID']
    // #swagger.description = "Update one user with defined ID"
    /**
     * #swagger.parameters['id'] = {
            in: 'params',
            description: '',
            type: 'integer'
        }

        #swagger.parameters['body'] = {
            in: 'body',
            description: '',
            schema: {
                $name: 'Jhon Doe',
                $address: 'Bandung',
                $age: 29,
                $phoneNumber: '081234567890',
            }
        }
     */

    const userRepo = db.getRepository(User);
    const id = req.params.id
    const { name, age, address, phoneNumber } = req.body

    if (!id || !name || !age || !address || !phoneNumber) {
        /* #swagger.responses[400] = {
            schema: { $error: 'fields required' },
            description: ''
        } */
        res.status(400).json({
            error: 'fields required'
        })
        return
    }

    const currentUser = await userRepo.findOneBy({
        id: parseInt(id)
    })

    if (!currentUser) {
        /* #swagger.responses[400] = {
            schema: { $error: 'fields required' },
            description: ''
        } */
        res.status(400).json({
            error: 'user not found'
        })
        return
    }

    currentUser.name = name
    currentUser.age = age
    currentUser.address = address
    currentUser.phoneNumber = phoneNumber
    await userRepo.save(currentUser)

    /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/User" },
        description: '' 
    } */

    res.json(currentUser)
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Delete User By ID']
    // #swagger.description = "Delete one user with defined ID"
    /**
     * #swagger.parameters['id'] = {
            in: 'params',
            description: '',
            type: 'integer'
        }
     */


    const { id } = req.params
    if (!id) {
        /* #swagger.responses[400] = {
            schema: { $error: 'fields required' },
            description: ''
        } */
        res.status(400).json({
            error: 'id required'
        })
        return
    }

    const userRepo = db.getRepository(User);
    const currentUser = await userRepo.findOneBy({
        id: parseInt(id)
    });

    if (!currentUser) {
        /* #swagger.responses[400] = {
            schema: { $error: 'fields required' },
            description: ''
        } */
        res.status(400).json({
            error: 'user not found'
        })
        return;
    }

    await userRepo.remove([currentUser])
    /* #swagger.responses[200] = {
            schema: { $message: 'success to delete user with id 1 and name John Doe' },
            description: ''
        } */
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