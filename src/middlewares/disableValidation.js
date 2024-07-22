// ./src/middlewares/disableValidation.js

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Bypass validation for all requests
    await next();
  };
};
