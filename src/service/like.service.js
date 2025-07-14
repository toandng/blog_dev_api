const { Post, Topic, User, Like } = require("@/db/models");

class LikesService {
  async getAll() {
    const likes = await Like.findAll({
      where: {
        likeable_type: "Post",
      },
    });
    return likes;
  }
}
module.exports = new LikesService();
