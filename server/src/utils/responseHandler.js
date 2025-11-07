module.exports = (res, code, data, success) => {
  return res.status(code).json({
    success: success,
    result: success ? data : { error: data },
  });
};