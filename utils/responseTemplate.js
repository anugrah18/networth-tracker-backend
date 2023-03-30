function responseWithStatus(res, msg, status = 200) {
  return res.status(status).json({ message: msg });
}

module.exports = responseWithStatus;
