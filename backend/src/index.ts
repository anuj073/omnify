import express from "express";
import cors from 'cors'
const app=express();

const port=process.env.PORT || 8000;

app.use(express.json())

app.use( cors({
    origin:["http:localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true,
    
}))

app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.listen(port,()=>{
 console.log(`Server running on http://localhost:${port}`)
})

export default app;