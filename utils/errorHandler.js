module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // console.log(process.env.NODE_ENV);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
