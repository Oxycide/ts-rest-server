import {Request, Response} from "express";
import User from "../models/user";


const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    res.status(200).json({
        users
    });

}

const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            msg: 'user not found'
        })
    }
    res.json({
        user
    })
}

const createUser = async (req: Request, res: Response) => {
    const {body} = req;
    try {
        const existUser = await User.findOne({
            where: {
                email: body.email
            }
        });
        if (existUser) {
            return res.status(400).json({
                msg: 'user already exists'
            })
        }
        ;
        const user = await User.create(body);
        await user.save();

        res.status(201).json({
            msg: 'user created successfully',
            user
        });
    } catch (error) {
        res.status(500).json({
            msg: 'error creating user'
        })
    }
}

const editUser = async (req: Request, res: Response) => {
    const {body} = req;
    const {id} = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'user not found'
            })
        }
        await user.update(body);
        res.json({
            msg: 'user updated successfully',
            user
        })
    } catch (error) {
        res.status(500).json({
            msg: 'error updating user'
        })
    }
}

const disableUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await User.findByPk(id);

    try {
        if (!user) {
            return res.status(404).json({
                msg: 'user not found'
            })
        }
        await user.update({
            status: false
        });
        res.json({
            msg: 'user disabled successfully',
            user
        })
    } catch (error) {
        res.status(500).json({
            msg: 'error disabling user'
        })
    }
}

export {getUsers, getUser, createUser, editUser, disableUser};