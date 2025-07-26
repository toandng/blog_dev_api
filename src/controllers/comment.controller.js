const response = require("@/utils/response");
const commentService = require("@/service/comment.service");

const index = async (req, res) => {
  const comments = await commentService.getAll();

  response.succsess(res, 200, comments);
};

const getAllCommentsInPost = async (req, res) => {
  const post_id = req.params.postId;
  console.log("post_id đã nhận đc", post_id);

  const comments = await commentService.getAllCommentsInPost(post_id, req.user);

  console.log(req.params.post_id);

  response.succsess(res, 200, comments);
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

// const update = async (req, res) => {
//   const post = await topicService.update(req.params.id, req.body);
//   res.json(post);
// };
// const create = async (req, res) => {
//   const post = await topicService.create(req.body);
//   res.json(post);
// };
// const remove = async (req, res) => {
//   await topicService.remove(req.params.id);
//   res.status(204).send();
// };

module.exports = {
  index,
  getAllCommentsInPost,
  // update,
  // create,
  // remove,
  // getBySlug,
};
