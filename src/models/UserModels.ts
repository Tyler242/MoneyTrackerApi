import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { ResponseCode, ResponseError } from "./Error";
import User from './User';

export class UserModel {
    userId: string;
    username: string;
    token: string = "";

    public constructor(body: any) {
        this.userId = body.userId;
        this.username = body.username;
    }

    public async addUser() {
        const jwt_secret: string = process.env.JWT_SECRET || "";
        if (jwt_secret === "") {
            throw new ResponseError(
                ResponseCode.InternalServerError,
                'Error loading secrets'
            );
        }

        this.token = jwt.sign(
            {
                username: this.username,
                userId: this.userId,
            },
            jwt_secret,
            { expiresIn: "24h" },
        );

        const user = new User({
            userId: this.userId,
            username: this.username,
            token: this.token
         });
        await user.save();
        return user;
    }
}

export class UserLoginModel {
    username: string;
    password: string;

    public constructor(body: any) {
        if (!body.username || !body.password) {
            throw new ResponseError(
                ResponseCode.BadRequest,
                "Invalid request body"
            );
        }
        this.username = body.username;
        this.password = body.password;
    }
}