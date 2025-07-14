const { Post, Topic, User } = require("@/db/models");
const likesService = require("@/service/like.service");
const { where } = require("sequelize");
class PostsService {
  async getAll() {
    const posts = await Post.findAll({
      include: [
        { model: Topic, as: "topics" },
        { model: User, as: "user" },
      ],
    });
    const result = posts.map((post) => {
      const postData = post.toJSON();
      if (postData.user) {
        postData.user.full_name = `${postData.user.first_name} ${postData.user.last_name}`;
      }
      return postData;
    });
    const likes = await likesService.getAll();
    const postIds = posts.map((post) => post.id);
    return { posts: result, postIds };
  }

  async getById(id) {
    const post = await Post.findOne({
      where: { id },
      include: [
        {
          model: Topic,
          as: "topic",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });
    if (post?.user) {
      post.user.full_name = `${post.user.first_name} ${post.user.last_name}`;
    }
    return post;
  }
  async getBySlug(slug) {
    console.log(slug);

    const post = await Post.findOne({
      where: { slug },
      include: [
        { model: Topic, as: "topics" },
        { model: User, as: "user" },
      ],
    });
    if (post?.user) {
      post.user.full_name = `${post.user.first_name} ${post.user.last_name}`;
    }
    return post;
  }

  async create(data) {
    const post = await Post.create(data);
    return post;
  }
  async update(id, data) {
    try {
      await Post.update(data, {
        where: { id },
      });
      return await Post.findByPk(id);
    } catch (error) {
      return console.log("Lỗi khi update", error);
    }
  }

  async remove(id) {
    await Post.destroy({
      where: { id },
    });
    return null;
  }
}
module.exports = new PostsService();
