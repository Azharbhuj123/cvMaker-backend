const httpStatus = require("http-status");
const { authService, tokenService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

module.exports = {
  login
};
