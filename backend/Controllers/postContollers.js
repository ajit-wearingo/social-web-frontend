const User = require("../Models/userSchema")
const Post = require("../Models/postSchema")

// =================Function to Create Post==========================
const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        if(!title || !description){
            return res.status(400).json("one or more fields required")
        }

        const creator = await User.findById(req.params.userId).select("_id")

        const post = new Post({
            creator,
            title,
            description
        })
        await post.save();
        //  type msg in resp

        res.status(200).json("success");
    } catch (err) {
        console.log(err);
        res.status(400).json("Process Failed")
    }

}

// ==========Function to Comment on Post ============================
const Comment = async (req, res) => {
    try {
        const comment = req.body.comment;

        if(!comment){
            return res.status(400).json("comment is required")
        }

        const post = await Post.findById(req.params.postid)
        const commentBy = req.params.commentorid;

        post.comments.push({
            comment,
            commentBy
        })
        await post.save()
        //  type msg in resp
        res.status(200).json("scuccess");
    } catch (err) {
        console.log(err);
    }

}

// ===============Function to Like a post ===========================

const LikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postid)
        const likerExists = post.likes.likedBy.includes(req.params.likerid)
        
        if(likerExists){
            post.likes.likeCount -= 1
            post.likes.likedBy.pop(req.params.likerid)

        }else{
            post.likes.likeCount += 1
            post.likes.likedBy.push(req.params.likerid)
        }

        //  type msg in resp
        await post.save()
        res.status(200).json("success");
    } catch (err) {
        console.log(err);
        res.status(400).json("Procees Failed")
    }

}

module.exports = {createPost, Comment, LikePost}