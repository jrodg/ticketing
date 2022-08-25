 import mongoose from "mongoose";

 interface UserAttrs {
    email: string;
    password: string
 }
//USER MODEL INTERFACE
 interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc
 }

 //USER PROPERTIES
 interface UserDoc extends mongoose.Document {
    email: string;
    password: string
 }

 const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
 })

 userSchema.statics.build = (attrs: UserAttrs) =>{
    return new User(attrs)
 }

 const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

 

 export {User}