import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { catchError } from "./catchError";
import { NextFunction, Request, Response } from 'express';
import { userModel } from "../Models/user.model";

export const checkEmailExist = catchError(async (req: Request, res: Response, next: NextFunction) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return res.status(409).json({ message: "email already exists!" })
    next()
})
export const getUserHeader = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.token) {
        return res.status(409).json({ message: "You are not logged in" })
    }
    const decoded = jwt.verify(req.headers.token as string, 'key') as string | JwtPayload;
    req.body.user = decoded
    next()
})
export const GetSingleUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    let users = await userModel.findById(req.params.id)
    if (!users) return res.json({ message: "user doesn't exist!" })
    next()
})
export const checkForImgMiddleWare = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        cloudinary.config({
            cloud_name: 'dqijwldax',
            api_key: '764827226872981',
            api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
        });
        await cloudinary.uploader.upload(req.file.path,
            { public_id: uuidv4() + "-" + req.file.originalname },
            async function (error, result) {
                if (result) {
                    req.body.image = result.secure_url
                    next()
                    
                }else{
                    return res.status(404).json({ message: "error uploading File" })
                }
            });
    } else {
        next()
    }
})