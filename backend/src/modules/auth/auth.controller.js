const catchAsync = require('../../utils/catchAsync');
const authService = require('./auth.service');

const registerUser = catchAsync(async (req, res) => {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
});

const loginUser = catchAsync(async (req, res) => {
    const user = await authService.loginUser(req.body);
    res.status(200).json(user);
});

module.exports = {registerUser, loginUser};