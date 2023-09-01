const ApiResponse = (
  message,
  data = null,
  statusCode = 200,
  hasError = false
) => {
  return {
    message,
    data,
    statusCode,
    hasError,
  };
};

module.exports = ApiResponse;
