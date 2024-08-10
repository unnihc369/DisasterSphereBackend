import Post from "../models/Posts.js";

export const createPost = async (req, res) => {
    try {
        const { title, disc, imageUrl, priority, disasterId, userId,username } = req.body;

        const newPost = new Post({
            title,
            disc,
            imageUrl,
            priority,
            disasterId,
            userId,
            username
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully!', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully!', post: deletedPost });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};

export const getPostsByDisasterId = async (req, res) => {
    const { disasterId } = req.params;
    try {
        const posts = await Post.find({ disasterId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};
