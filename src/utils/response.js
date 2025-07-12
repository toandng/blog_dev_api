function succsess(res, status, data, message) {
  res.status(status).json({
    succsess: true,
    data,
    message,
  });
}

function error(res, status, message, errors) {
  res.status(Number.isInteger(status) ? status : 500).json({
    succsess: false,
    message,
    errors,
  });
}

module.exports = {
  succsess,
  error,
};
