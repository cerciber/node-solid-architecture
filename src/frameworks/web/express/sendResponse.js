module.exports = (req, res, body) => {
  res.status(body.status).send(body);
};
