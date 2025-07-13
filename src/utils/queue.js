const { Queue } = require("@/db/models");
async function dispatch(type, payload) {
  const newQueue = {
    type,
    payload: JSON.stringify(payload),
  };
  await Queue.create(newQueue);
}

module.exports = {
  dispatch,
};
