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
dotenv_1.default.config();
//@ts-ignore
mongoose_1.default.connect(process.env.DB_CONNECTION);
const config_1 = require("./config");
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
            message: "Incorrrect credentials"
        });
    }
    //@ts-ignore
    const isPasswordCorrect = bcrypt_1.default.compare(password, existinguser.password);
    if (!isPasswordCorrect) {
        res.status(403).json({
            message: "Incorrrect credentials"
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
app.get("/api/v1/content", (req, res) => {
});
app.post("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3002, () => {
    console.log('DB started');
});
