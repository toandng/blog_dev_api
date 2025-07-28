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
    try {
      const topic = await Topic.findOne({ where: { slug } });

      return topic;
    } catch (error) {
      throw new Error("Invalid slug");
    }
  }

  async findOrCreate(name) {
    const baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (await Topic.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const [topic, created] = await Topic.findOrCreate({
      where: { name },
      defaults: {
        name,
        slug,
        image: faker.image.urlPicsumPhotos(),
        description: faker.lorem.sentence(),
        posts_count: 0,
      },
    });

    return { topic, created };
  }
  async create(data) {
    const topic = await Topic.create(data);
    return topic;
  }
  async update(id, data) {
    try {
      await Topic.update(data, {
        where: { id },
      });

      return await Topic.findByPk(id);
    } catch (error) {
      return console.log("Lỗi khi update: ", error);
    }
  }

  async remove(id) {
    await Topic.destroy({
      where: { id },
    });

    return null;
  }
}

module.exports = new TopicService();
