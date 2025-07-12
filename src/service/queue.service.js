const { Queue } = require("@/db/models");
const { where } = require("sequelize");
class QueueService {
  async findPendingJob(data) {
    const queue = await Queue.findAll({
      where: {
        status: "pending",
      },
    });
    return queue;
  }

  async create(data) {
    const queue = await Queue.create(data);
    return queue;
  }
  async update(data, id) {
    await Queue.update(data, {
      where: { id },
    });
  }
  async remove(id) {
    await Queue.destroy({
      where: { id },
    });
  }
}
module.exports = new QueueService();
