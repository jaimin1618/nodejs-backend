const HttpsRequestOnly = (req, res, next) => {
  if (process.env.ENVIRONMENT != "development" && !req.secure)
    return res.status(301).redirect("https://" + req.headers.host + req.url);
  next();
};

module.exports = HttpsRequestOnly;
