import mongoose, {model, Schema} from "mongoose";
//@ts-ignore
//mongoose.connect(process.env.DB_CONNECTION)
//user, link, content, tags
const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'user', required: true },
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'user', required: true, unique: true },
})

const TagSchema = new Schema({
    content: String,
})
export const UserModel = model("user", UserSchema);
export const LinkModel = model("links", LinkSchema);
export const ContentModel = model("content", ContentSchema);
export const TagModel = model("tags", TagSchema)