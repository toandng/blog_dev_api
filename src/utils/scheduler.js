require("dotenv").config();
require("module-alias/register");
const cron = require("node-cron");

// mỗi 2 phút gửi 1 email bằng cách dispatch queue
const activeTasks = {};
function schedulerJob(name, cronTime, handler) {
  if (activeTasks[name]) {
    return console.log(`Task "${name}" exists, cancle`);
  }
  const tasks = cron.schedule(cronTime, async () => {
    try {
      handler();
    } catch (error) {
      console.log(error);
    }
  });
}
module.exports = schedulerJob;
