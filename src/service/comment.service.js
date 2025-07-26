const { Post, Comment, User } = require("@/db/models");
const sequelize = require("@/db/models").sequelize;
const likesService = require("@/service/like.service");
const { Op } = require("sequelize");

class CommentService {
  async getAll() {
    const comments = await Comment.findAll();

    return comments;
  }

  async getAllCommentsInPost(postId, currentUser) {
    const comments = await Comment.findAll({
      where: {
        post_id: postId,
        parent_id: null,
        deleted_at: null,
      },
      attributes: [
        "id",
        "user_id",
        "post_id",
        "parent_id",
        "content",
        "deleted_at",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: User,
          as: "user", // Alias cho người dùng liên quan đến comment chính
          attributes: [
            "id",
            "avatar",
            "fullname", // Dòng này sẽ hoạt động nếu 'fullname' là thuộc tính ảo hoặc cột trực tiếp
            "first_name",
            "last_name",
            "email",
            "username",
          ],
        },
        {
          model: Comment,
          as: "replies", // Alias cho các phản hồi của comment chính
          where: {
            deleted_at: null, // Chỉ lấy các phản hồi chưa bị xóa
          },
          required: false, // Cho phép các comment không có phản hồi
          attributes: [
            "id",
            "user_id",
            "post_id",
            "parent_id",
            "content",
            "deleted_at",
            "created_at",
            "updated_at",
          ],
          include: [
            {
              model: User,
              as: "user", // Alias cho người dùng liên quan đến phản hồi
              attributes: [
                "id",
                "avatar",
                "fullname", // Bao gồm fullname cho các phản hồi nữa, nếu nó là thuộc tính ảo
                "first_name",
                "last_name",
                "email",
                "username",
              ],
            },
          ],
        },
      ],
      order: [
        ["created_at", "ASC"], // Sắp xếp các comment chính theo ngày tạo
        [{ model: Comment, as: "replies" }, "created_at", "ASC"], // Sắp xếp các phản hồi theo ngày tạo
      ],
    });

    // Ví dụ về cách bạn có thể sử dụng currentUser nếu cần (ví dụ: để thêm cờ 'isLiked')
    // if (currentUser) {
    //   for (const comment of comments) {
    //     // Kiểm tra xem currentUser đã thích comment này chưa
    //     // Bạn sẽ cần một phương thức likeService cho việc này
    //     // comment.dataValues.isLikedByCurrentUser = await likesService.checkIfLiked(comment.id, currentUser.id);
    //     for (const reply of comment.replies) {
    //       // Kiểm tra xem currentUser đã thích phản hồi này chưa
    //       // reply.dataValues.isLikedByCurrentUser = await likesService.checkIfLiked(reply.id, currentUser.id);
    //     }
    //   }
    // }

    return comments;
  }

  // async getById(id) {
  //   const topic = await Comment.findOne({ where: { id } });
  //   return topic;
  // }

  // async getBySlug(slug) {
  //   // console.log(slug);

  //   // Nếu đây là tìm post theo slug
  //   const post = await Post.findOne({
  //     where: { slug },
  //     include: [
  //       { model: Comment, as: "topics" },
  //       { model: User, as: "user" },
  //     ],
  //   });

  //   if (post?.user) {
  //     post.user.full_name = `${post.user.first_name} ${post.user.last_name}`;
  //   }
  //   return post;
  // }

  // Nếu bạn muốn tìm topic theo slug
  // async getTopicBySlug(slug) {
  //   const topic = await Comment.findOne({
  //     where: { slug },
  //     include: [
  //       {
  //         model: Post,
  //         as: "posts",
  //         include: [{ model: User, as: "user" }],
  //       },
  //     ],
  //   });
  //   return topic;
  // }

  async create(data) {
    const topic = await Comment.create(data);
    return topic;
  }

  async update(id, data) {
    try {
      await Comment.update(data, {
        where: { id },
      });
      return await Comment.findByPk(id);
    } catch (error) {
      console.log("Lỗi khi update", error);
      return null;
    }
  }

  async remove(id) {
    await Comment.destroy({
      where: { id },
    });
    return null;
  }
}

module.exports = new CommentService();
