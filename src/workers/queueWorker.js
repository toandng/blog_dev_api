require("module-alias/register");

const { Queue } = require("@/db/models");
const sendVerifyEmailJob = require("@/job/sendVerifyEmailJob");
const queueService = require("@/service/queue.service");

const handlers = {
  sendVerifyEmailJob,
};
async function jobProcess(job) {
  const handler = handlers[job.type];

  console.log(job.type);

  if (handler) {
    try {
      await Queue.update({ status: "processing" }, { where: { id: job.id } });

      await handler(job);

      await Queue.update({ status: "completed" }, { where: { id: job.id } });
    } catch (error) {
      await Queue.update({ status: "reject" }, { where: { id: job.id } });
    }
  }
}

async function queueWorker() {
  while (true) {
    const jobs = await queueService.findPendingJob();

    for (let job of jobs) {
      await jobProcess(job);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
queueWorker();
