/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async create(req, res) {
        if(!req.session.user) return res.forbidden();

        const { text } = req.body;
        const userId = req.session.user;
        const createdPost = await Post.create({
            userId,
            text,
        }).fetch().catch(err => res.serverError(err));

        return res.ok(createdPost);
    },
    async find(req, res) {
        if(!req.session.user) return res.forbidden();

        const posts = await Post.find().catch(err => res.serverError(err));

        return res.ok(posts);
    }
};

