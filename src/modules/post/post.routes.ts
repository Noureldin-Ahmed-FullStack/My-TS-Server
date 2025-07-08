import express from 'express'
import { GetSinglePost, addPost, deletePost, getAllPosts, getAllUrgentPosts, updatePost, updatePostCover, updatePostImages } from './post.controller'
import { getUserHeader } from '../../middleware/middleware'
import { upload } from '../../middleware/FileUpload/uploads'

const postRouter = express.Router()
postRouter.get('/post', getAllPosts)
postRouter.get('/urgentPost', getAllUrgentPosts)
postRouter.post('/post',getUserHeader,addPost)
postRouter.get('/userPost',getUserHeader, GetSinglePost)
postRouter.put('/post/:id', updatePost)
postRouter.delete('/post/:id', deletePost)

postRouter.post('/postCoverUpdate/:id', upload.single('file'), updatePostCover)
postRouter.post('/postImages/:id', upload.array('file',6), updatePostImages)


export default postRouter