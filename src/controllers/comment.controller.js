const response = require("@/utils/response");
const commentService = require("@/service/comment.service");

const index = async (req, res) => {
  const comments = await commentService.getAll();

  response.succsess(res, 200, comments);
};

const getAllCommentsInPost = async (req, res) => {
  const comments = await commentService.getAllCommentsInPost(
    req.params.postId,
    req.user
  );

  console.log(comments);

  res.json(comments);
};

const toggleLike = async (req, res) => {
  try {
    const result = await commentService.toggleLike(
      req.user,
      req.params.commentId
    );
    response.succsess(res, 200, result);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};
// const getBySlug = async (req, res) => {
//   try {
//     const post = await topicService.getBySlug(req.params.slug);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Topic not found",
//       });
//     }
//     res.json({
//       success: true,
//       data: post,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };
const create = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Current user:", req.user);

    const { content, post_id, parent_id } = req.body;

    if (!post_id || !content) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin bắt buộc: post_id và content",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Bạn cần đăng nhập để comment",
      });
    }

    const comment = await commentService.create(req.user, {
      post_id,
      parent_id: parent_id || null,
      content,
    });

    return res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    console.error("Lỗi khi tạo comment:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Lỗi server",
    });
  }
};

const update = async (req, res) => {
  try {
    const comment = await commentService.update(
      req.params.id,
      req.body,
      req.user
    );
    response.succsess(res, 200, comment);
  } catch (error) {
    response.error(res, 400, error.message);
  }
};
const remove = async (req, res) => {
  await topicService.remove(req.params.id);
  res.status(204).send();
};

module.exports = {
  index,
  getAllCommentsInPost,
  update,
  create,
  remove,
  toggleLike,
  // getBySlug,
};
