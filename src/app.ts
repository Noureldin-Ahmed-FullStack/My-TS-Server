import express from 'express'

const app = express()
app.use(express.json())
app.get("/",(req,res)=>{
    return res.send("hello world")
})

app.get("/test",(req,res)=>{
    return res.send("test")
})

app.listen(3000, ()=>{
    console.log("server running on http://localhost/3000");
    
})