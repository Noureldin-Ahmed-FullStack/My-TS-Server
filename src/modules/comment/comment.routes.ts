import express from 'express'
import { getUserHeader } from '../../middleware/middleware'
import { addComment } from './comment.controller'

const commentRouter = express.Router()
// commentRouter.get('/post', getAllPosts)
commentRouter.post('/comment',getUserHeader,addComment)

export default commentRouter