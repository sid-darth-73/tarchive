"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
dotenv_1.default.config();
//@ts-ignore
mongoose_1.default.connect(process.env.DB_CONNECTION);
const config_1 = require("./config");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const pw = req.body.password;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(pw, 7);
        yield db_1.UserModel.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            message: "User Added/Signed Up"
        });
    }
    catch (error) {
        //duplicate user error
        res.status(411).json({
            message: "User Already Exists"
        });
        console.log(error);
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existinguser = yield db_1.UserModel.findOne({
        username
    });
    if (!existinguser) {
        res.status(403).json({
            message: "Incorrrect username"
        });
    }
    //@ts-ignore
    const isPasswordCorrect = bcrypt_1.default.compare(password, existinguser.password);
    if (!isPasswordCorrect) {
        res.status(403).json({
            message: "Incorrrect password"
        });
    }
    if (existinguser) {
        const token = jsonwebtoken_1.default.sign({
            id: existinguser._id
        }, config_1.JwtPassword);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrrect credentials"
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    yield db_1.ContentModel.create({
        link: link,
        title: title,
        tags: [],
        userId: req.userId,
        type: type,
    });
    res.json({
        message: "Content added for the user"
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    const userIdforUserWhoNeedsDeletion = req.userId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        userId: userIdforUserWhoNeedsDeletion
    });
    res.json({
        message: "Deleted"
    });
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const canShare = req.body.share;
    if (!canShare) {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.status(200).json({
            message: "Link deleted"
        });
        return;
    }
    const existingUserLink = yield db_1.LinkModel.findOne({
        userId: req.userId
    });
    if (existingUserLink) {
        res.json({
            message: "user already exists",
            hash: existingUserLink.hash
        });
        return;
    }
    const hash = (0, utils_1.random)(8);
    yield db_1.LinkModel.create({
        userId: req.userId,
        hash: hash
    });
    res.status(200).json({
        message: "Link Created: /share/" + hash
    });
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const givenHash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash: givenHash
    });
    if (link) {
        const content = yield db_1.ContentModel.find({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
            userId: link.userId,
            //_id: link.userId  (test it later)
        });
        res.json({
            username: user === null || user === void 0 ? void 0 : user.username,
            content: content
        });
    }
    else {
        //givenHash does not lead to a valid link
        res.status(402).json({
            message: "Invalid url"
        });
    }
}));
app.listen(3002, () => {
    console.log('DB started');
});
