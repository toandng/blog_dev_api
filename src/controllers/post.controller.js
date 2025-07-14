const response = require("@/utils/response");
const postService = require("@/service/post.service");

const index = async (req, res) => {
  const { posts } = await postService.getAll();

  res.json({ data: posts });
};
const getBySlug = async (req, res) => {
  try {
    const post = await postService.getBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const post = await postService.update(req.params.id, req.body);
  res.json(post);
};
const create = async (req, res) => {
  const post = await postService.create(req.body);
  res.json(post);
};
const remove = async (req, res) => {
  await postService.remove(req.params.id);
  res.status(204).send();
};

module.exports = {
  index,
  update,
  create,
  remove,
  getBySlug,
};
