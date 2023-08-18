exports.sendResponse = async (req, res, status, body) => {
  res.status(status).send(body);
};
