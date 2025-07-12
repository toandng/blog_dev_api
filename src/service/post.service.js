const { Post, Topic, Comment, User } = require("@/db/models");

const getAllPost = async (page, limit) => {
  const offset = (page - 1) * limit;
  const { rows: items, count: total } = await Post.findAndCountAll({
    attributes: [
      "id",
      "title",
      "slug",
      "description",
      "like_count",
      "user_id",
      "public_at",
    ],
    include: [
      {
        model: Topic,
        as: "topic",
        attributes: ["id", "slug", "description"],
      },
      {
        model: Comment,
        as: "comments",
        require: false,
      },
      {
        model: User,
        as: "author",
      },
    ],

    limit,
    offset,
  });
  return { items, total };
};

module.exports = {
  getAllPost,
};
