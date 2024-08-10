import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    disc: { type: String, required: true },
    imageUrl: { type: String },
    priority: { type: Number, required: true, enum: [1, 2] }, 
    disasterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username:{type:String,required:true}
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
