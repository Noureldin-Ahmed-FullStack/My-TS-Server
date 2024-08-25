import bcrypt from "bcrypt"
import joi from "joi"
import { NextFunction, Request, Response } from 'express';

export const validateShema = (req: Request, res: Response, next: NextFunction)=>{
const signUpSchemaValidation = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    repassword: joi.valid(joi.ref('password')).required(),
})
const validationError = signUpSchemaValidation.validate(req.body)
if (validationError.error) {
    return res.status(409).json({message: validationError.error.details[0].message})
}
next()


}
export const hashPass = (req: Request, res: Response, next: NextFunction)=>{
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}