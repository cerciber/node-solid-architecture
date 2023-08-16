exports.success = async (req, res, status, message, body) => {
  res.status(status).send({
    status,
    message,
    error: false,
    body,
  });
};

exports.error = async (req, res, status, message, body) => {
  res.status(status).send({
    status,
    message,
    error: true,
    body,
  });
};
