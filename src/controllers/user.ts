import 'dotenv/config';
import fetch from 'node-fetch';


import { UserLoginModel, UserModel } from "../models/UserModels";
import { ResponseCode, ResponseError } from '../models/Error';
import User, { IUser } from '../models/User';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

type FoundIUser = (IUser & {
    _id: Types.ObjectId;
}) | null;

export const postLogin = async (req: Request, res: Response, next: any) => {
    try {

        const userInfo: UserModel = await verifyLogin(req.body);
        // get temp user from db or add it if not already there
        let user: FoundIUser = await User.findOne({ userId: userInfo.userId, username: userInfo.username });
        if (!user) {
            user = await userInfo.addUser();
        }

        res.status(ResponseCode.Created).json({ userId: user.userId, token: user.token });
    } catch (err) {
        next(err);
    }
}

const verifyLogin = async (data: any): Promise<UserModel> => {
    const body = new UserLoginModel(data);
    const options: object = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'requesting-app': 'MoneyTracker',
            'x-api-key': process.env.MONEY_TRACKER_KEY
        },
        body: JSON.stringify(body)
    };

    const response = await fetch(process.env.USER_API_URL + "/validate", options);
    if (response.status !== 201) {
        throw new ResponseError(
            response.status as ResponseCode,
            "Unable to login"
        );
    }

    const responseData = await response.json();
    return new UserModel(responseData.user);
}