import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"; 
import cors from "cors"
import { UserModel, ContentModel, LinkModel, TagModel } from "./db"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { userMiddleware } from "./middleware";
dotenv.config()
//@ts-ignore
mongoose.connect(process.env.DB_CONNECTION)
import { JwtPassword } from "./config"
import { random } from "./utils";



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
            message: "Incorrrect username"
        })
    }
    //@ts-ignore
    const isPasswordCorrect = bcrypt.compare(password, existinguser.password)
    if(!isPasswordCorrect) {
        res.status(403).json({
            message: "Incorrrect password"
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


app.get("/api/v1/content", userMiddleware, async (req, res)=>{
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.post("/api/v1/content", userMiddleware, async (req, res)=>{
    const link = req.body.link
    const type = req.body.type
    const title = req.body.title
    await ContentModel.create({
        link: link,
        title: title,
        tags: [],
        userId: req.userId,
        type: type,
    })
    res.json({
        message: "Content added for the user"
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res)=>{
    const contentId = req.body.contentId
    const userIdforUserWhoNeedsDeletion = req.userId
    await ContentModel.deleteMany({
        contentId,
        userId: userIdforUserWhoNeedsDeletion
    })

    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res)=>{
    const canShare = req.body.share
    if(!canShare) {
        await LinkModel.deleteOne({
            userId: req.userId
        })
        res.status(200).json({
            message: "Link deleted"
        })
        return;
    }
    await LinkModel.create({
        userId: req.userId,
        hash: random(7)
    })
    res.status(200).json({
        message: "Link Created"
    })
})

app.get("/api/v1/brain/:shareLink", async (req, res)=>{
    const givenHash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash: givenHash
    })
    if(link) {
        const content = await ContentModel.find({
            userId: link.userId
        })
        const user = await UserModel.findOne({
            userId: link.userId
        })

        res.json({
            username: user?.username,
            content: content
        })
    }else {
        //givenHash does not lead to a valid link
        res.status(402).json({
            message: "Invalid url"
        })
    }
})

app.listen(3002, ()=>{
    console.log('DB started')
})