const response = require("@/utils/response");
const postService = require("@/service/post.service");

const getList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { items, total } = await postService.getAllPost(page, limit);
    response.succsess(res, 200, { items, total });
  } catch (error) {
    response.error(res, 400, error.message);
  }
};

module.exports = {
  getList,
};
