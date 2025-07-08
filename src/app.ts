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
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello World</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f0f0f0;
            padding: 40px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Hello 👋👋 world 🌍🌍🌍</h1>
        <p>This server is made by <a href ="https://github.com/Noureldin-Ahmed-FullStack">Noureldin</a></p>
      </body>
    </html>
  `);
})

app.get("/test", (req, res) => {
    return res.send("test")
})
const port = process.env.PORT || 3000
dbConnection()
app.listen(port || 3000, () => {
    console.log(`Server Running 👾 ¯\\_(ツ)_/¯ on http://localhost:${port}/`);

})