const response = require("@/utils/response");
const topicService = require("@/service/topic.service");

const index = async (req, res) => {
  const topics = await topicService.getAll();

  response.succsess(res, 200, topics);
};
const getBySlug = async (req, res) => {
  try {
    const post = await topicService.getBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
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
  // update,
  // create,
  // remove,
  getBySlug,
};
