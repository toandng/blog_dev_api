const { Post, Topic, User, Sequelize, Op } = require("@/db/models");
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
    // console.log(slug);

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

  async getRelatedPosts(currentPostId, currentUser = null, limit = 3) {
    try {
      const currentPost = await Post.findOne({
        where: {
          id: currentPostId,
          status: "published",
          published_at: { [Op.lte]: new Date() },
        },
        include: {
          model: Topic,
          as: "topics",
          through: { attributes: [] },
        },
      });

      if (!currentPost) return [];

      const topicIds = currentPost.topics.map((topic) => topic.id);

      let relatedPosts = [];

      if (topicIds.length > 0) {
        // Tìm bài viết có cùng topic
        relatedPosts = await Post.findAll({
          where: {
            id: { [Op.not]: currentPostId },
            status: "published",
            published_at: { [Op.lte]: new Date() },
          },
          include: [
            {
              model: Topic,
              as: "topics",
              where: {
                id: { [Op.in]: topicIds },
              },
              through: { attributes: [] },
            },
            {
              model: User,
              as: "user",
              attributes: [
                "id",
                "first_name",
                "last_name",
                "avatar",
                "user_name",
              ],
            },
          ],
          limit: parseInt(limit),
          order: [
            // Ưu tiên bài viết mới nhất
            ["published_at", "DESC"],
            // Thêm random để đa dạng
            Sequelize.literal("RAND()"),
          ],
        });
      }

      // Nếu không đủ bài viết cùng topic, lấy thêm bài viết khác
      if (relatedPosts.length < limit) {
        const remainingLimit = limit - relatedPosts.length;
        const additionalPosts = await Post.findAll({
          where: {
            id: {
              [Op.notIn]: [
                currentPostId,
                ...relatedPosts.map((post) => post.id),
              ],
            },
            status: "published",
            published_at: { [Op.lte]: new Date() },
          },
          include: [
            {
              model: Topic,
              as: "topics",
              through: { attributes: [] },
            },
            {
              model: User,
              as: "user",
              attributes: [
                "id",
                "first_name",
                "last_name",
                "avatar",
                "user_name",
              ],
            },
          ],
          limit: remainingLimit,
          order: [Sequelize.literal("RAND()")],
        });

        relatedPosts = [...relatedPosts, ...additionalPosts];
      }
    } catch (error) {
      console.error("Error in getRelatedPosts service:", error);
      return [];
    }
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
