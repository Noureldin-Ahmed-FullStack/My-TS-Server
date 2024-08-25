import express from 'express'
import { hashPass, validateShema } from '../../middleware/hashPassword'
import { checkEmailExist, getUserHeader } from '../../middleware/middleware'
import { upload } from '../../middleware/FileUpload/uploads'
import { getAllDoctors, getAllUsers, GetSingleUser, GetSingleUserRes, setUserRole, signIn, signUp, test, updateUser, updateUserPic, Validate } from './user.controller'

const userRouter = express.Router()

userRouter.post('/signUp', validateShema, checkEmailExist, hashPass, signUp)
userRouter.post('/signIn', signIn)
userRouter.post('/userRole', getUserHeader, setUserRole)
// userRouter.post('/ContactMe', ContactMe)
userRouter.get('/users', getAllUsers)
userRouter.get('/usersTest', test)
userRouter.get('/doctors', getAllDoctors)
userRouter.get('/getSingleUser/:id', GetSingleUserRes)
userRouter.get('/usersValidation/:id', Validate)

// userRouter.post('/upload/:id',GetSingleUser, upload.single('file'), updateUserPic)
userRouter.post('/upload/:id', GetSingleUser, upload.single('file'), updateUserPic)
userRouter.put('/user/:id', GetSingleUser, upload.single('file'), updateUser)


export default userRouter