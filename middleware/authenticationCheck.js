const { COMPANY, JOBSEEKER } = require("../constants/role");
const jwt = require("jsonwebtoken");

function authenticationCheck(req, res, next) {
  let token = req.headers?.authorization?.split(" ")[1];

  let user = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {}

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({
      msg: "unauthenticated",
    });
  }
}

const isSeeker = (req, res, next) => {
  if (req.user.role === JOBSEEKER) {
    next();
  } else {
    res.status(403).send({
      msg: "forbidden",
    });
  }
};

const isCompany = (req, res, next) => {
  if (req.user.role === COMPANY) {
    next();
  } else {
    res.status(403).send({
      msg: "forbidden",
    });
  }
};

module.exports = {
  authenticationCheck,
  isSeeker,
  isCompany,
};
