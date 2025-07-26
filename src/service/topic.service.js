const { Post, Topic, User } = require("@/db/models");
const sequelize = require("@/db/models").sequelize; // hoặc require("@/config/database")
const likesService = require("@/service/like.service");
const { Op } = require("sequelize");

class TopicService {
  async getAll() {
    const topics = await Topic.findAll({
      include: [
        {
          model: Post,
          as: "posts",
          attributes: [],
          through: { attributes: [] },
        },
      ],
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("posts.id")), "post_count"],
        ],
      },
      group: ["Topic.id"],
      order: [["id", "ASC"]],
    });
    // console.log(topics);

    return topics;
  }

  async getById(id) {
    const topic = await Topic.findOne({ where: { id } });
    return topic;
  }

  async getBySlug(slug) {
    // console.log(slug);

    // Nếu đây là tìm post theo slug
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

  // Nếu bạn muốn tìm topic theo slug
  async getTopicBySlug(slug) {
    const topic = await Topic.findOne({
      where: { slug },
      include: [
        {
          model: Post,
          as: "posts",
          include: [{ model: User, as: "user" }],
        },
      ],
    });
    return topic;
  }

  // async create(data) {
  //   const topic = await Topic.create(data);
  //   return topic;
  // }

  // async update(id, data) {
  //   try {
  //     await Topic.update(data, {
  //       where: { id },
  //     });
  //     return await Topic.findByPk(id);
  //   } catch (error) {
  //     console.log("Lỗi khi update", error);
  //     return null;
  //   }
  // }

  // async remove(id) {
  //   await Topic.destroy({
  //     where: { id },
  //   });
  //   return null;
  // }
}

module.exports = new TopicService();
