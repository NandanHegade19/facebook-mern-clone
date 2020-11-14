import mongoose from 'mongoose';

const fbpostSchema = mongoose.Schema({
    user: String,
    imgName: String,
    text: String,
    avatar: String,
    timestamp: String,
    likes: String,
    comments: [
        {
            comment: String,
            commentBy: String
        }
    ]
})

export default mongoose.model('posts', fbpostSchema);