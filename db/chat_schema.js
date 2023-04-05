import mongoose from "mongoose";

const chat_schema = new mongoose.Schema({
    // question_num:{
    //     type:Number,
    //     required: true,
    //     default: 0
    // },
    query:{
        type:String,
        required: true
    },
    reply:{
        type:String,
        required: true
    },
    time:{
        type:Date,
        default: new Date()
    }
});

const chat_data = new mongoose.model("chat_gpt",chat_schema);

export {chat_data};