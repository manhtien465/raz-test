const { screenPath } = require('../constants/screenLog');
const ScreenLogService = require('../services/screenLog.service');

const screenLogMiddeware = async (req, res, next) => {
  await new ScreenLogService().update(req.user.user_id, screenPath[req.route.path]);
  return next();
};

module.exports = screenLogMiddeware;
