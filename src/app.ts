import express from 'express'
import { dbConnection } from './dbConnection'
import cors from "cors"
import userRouter from './modules/user/user.routes';
import commentRouter from './modules/comment/comment.routes';
import postRouter from './modules/post/post.routes';

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(commentRouter)
app.use(postRouter)
app.get("/",(req,res)=>{
    return res.send("Hello 👋👋 world 🌍🌍🌍")
})

app.get("/test",(req,res)=>{
    return res.send("test")
})
const port = process.env.PORT || 3000
dbConnection()
app.listen(port || 3000, ()=>{
    console.log(`Server Running 👾 ¯\\_(ツ)_/¯ on http://localhost:${port}/`);
    
})