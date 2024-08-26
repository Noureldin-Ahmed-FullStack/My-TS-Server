// import { sendEmail } from "../../mail/sendMail.ts"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { userModel } from "../../Models/user.model"
import { catchError } from "../../middleware/catchError";
import { NextFunction, Request, Response } from 'express';




interface SignInBody {
    email: string;
    password: string;
}
// const ContactMe = catchError(async (req, res) => {
//     const user = await req.body
//     try {
//         await sendEmail(user.name, user.email, user.phone, user.message, user.reciver)
//     } catch (error) {
//         res.json({ message: "Error", error: error })
//     }
//     res.json({ message: "success" })
// })

const signUp = catchError(async (req: Request, res: Response) => {
    req.body.userPFP = 'https://ssniper.sirv.com/Images/unknown.jpg'
    const user = await userModel.create(req.body)
    console.log(user._id);
    // sendEmail(user._id,user.email)
    res.json({ message: "success" })
})
const test = catchError(async (req: Request, res: Response) => {

    res.json({ message: "success" })
})
const setUserRole = catchError(async (req: Request, res: Response) => {
    const newRole = req.body.role
    await userModel.findByIdAndUpdate(req.body.user.uid, { role: newRole, decided: true }, { runValidators: true })
    res.json({ message: "success" })
})
const getAllUsers = catchError(async (req: Request, res: Response) => {
    const users = await userModel.find()
    res.json(users)
})
export const getAllDoctors = catchError(async (req: Request, res: Response) => {
    const users = await userModel.find({ isDoctor: true })
    res.json(users)
})
export const GetSingleUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const users = await userModel.findById(req.params.id)
    if (!users) {
        return res.json({ message: "user doesnt exist" })
    }
    next()
})
export const GetSingleUserRes = catchError(async (req: Request, res: Response) => {
    const users = await userModel.findById(req.params.id).populate('pets').populate('clinics')
    if (!users) {
        return res.json({ message: "user doesnt exist" })
    }
    res.json({ message: users })
})
const Validate = catchError(async (req: Request, res: Response) => {
    await userModel.findByIdAndUpdate(req.params.id, {
        Validated: true
    })
    res.json({ message: "Validated" })
})
const signIn = catchError(async (req: Request<{}, {}, SignInBody>, res: Response) => {
    let user = await userModel.findOne({ email: req.body.email })
    console.log(user);
    if (user && user.password && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ uid: user._id, email: user.email }, 'key')
        return res.json({ message: "hello " + user.name, token })
    }

    return res.status(409).json({ message: "Email or password is incorrect!" })
    // if (user.Validated) {
    //     if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //         let token = jwt.sign({ uid: user._id, email: user.email }, 'key')
    //         return res.json({ message: "hello " + user.name, token })
    //     }

    //     return res.json({ message: "Email or password is incorrect!" })
    // } else { return res.json({ message: "Email not validated" }) }

})
// const verify = catchError((req: Request, res: Response) => {
//     jwt.verify(req.params.token, 'key', async (err, decoded) => {
//         if (err) return res.json(err)
//     }
//     )
// })

const updateUser = catchError(async (req: Request, res: Response) => {
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
                    console.log(result);
                    req.body.userPFP = result.secure_url
                } else {
                    return res.status(400).json({ message: "error uploading File" })
                }

            });
    }

    await userModel.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "success" });
})
const updateUserPic = catchError(async (req: Request, res: Response) => {
    cloudinary.config({
        cloud_name: 'dqijwldax',
        api_key: '764827226872981',
        api_secret: "Nht0PwGG8HmJt14MpdKDK4E79Uc"
    });
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    await cloudinary.uploader.upload(req.file.path,
        { public_id: uuidv4() + "-" + req.file.originalname },
        async function (error, result) {
            if (result) {
                console.log(result.secure_url);
                await userModel.findByIdAndUpdate(req.params.id, { userPFP: result.secure_url })
                res.json({ message: "success" })
            } else {
                res.status(400).json({ message: "error uploading File" })

            }

        });
})



export {
    signUp,
    signIn,
    getAllUsers,
    Validate,
    updateUserPic,
    updateUser,
    // ContactMe,
    setUserRole,
    test
}