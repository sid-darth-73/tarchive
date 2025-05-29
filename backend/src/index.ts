import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"; 
import cors from "cors"
import { UserModel, ContentModel, LinkModel, TagModel } from "./db"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()
//@ts-ignore
mongoose.connect(process.env.DB_CONNECTION)
import { JwtPassword } from "./config"



const app = express()

app.use(express.json())
app.use(cors())


app.post("/api/v1/signup", async (req, res)=>{
    const username = req.body.username
    const pw = req.body.password

    try {
        const hashedPassword = await bcrypt.hash(pw, 7)
        await UserModel.create({
            username: username,
            password: hashedPassword
        })
         
        res.json({
            message: "User Added/Signed Up"
        })
    } catch (error) {
        //duplicate user error
        res.status(411).json({
            message: "User Already Exists"
        })
        console.log(error)
    }
})

app.post("/api/v1/signin", async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existinguser = await UserModel.findOne({
        username
    })
    if(!existinguser) {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
    //@ts-ignore
    const isPasswordCorrect = bcrypt.compare(password, existinguser.password)
    if(!isPasswordCorrect) {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
    if(existinguser) {
        const token = jwt.sign({
            id: existinguser._id
        }, JwtPassword)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})


app.get("/api/v1/content", (req, res)=>{

})

app.post("/api/v1/content", (req, res)=>{

})

app.delete("/api/v1/content", (req, res)=>{

})

app.post("/api/v1/brain/share", (req, res)=>{

})

app.get("/api/v1/brain/:shareLink", (req, res)=>{
    
})

app.listen(3002, ()=>{
    console.log('DB started')
})