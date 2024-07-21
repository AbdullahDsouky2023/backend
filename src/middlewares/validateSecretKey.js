// ./src/middlewares/validateSecretKey.js

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    try {
      // Get the Authorization header from the request
      const authorizationHeader = ctx.request.header.authorization;

      // Replace 'YOUR_SECRET_KEY' with your actual secret key
      const expectedSecretKey = '005e3da5931bNIJK_DEVELOPMENT7b613448cb210f5461ab';

      // Check if the Authorization header contains the expected secret key
      if (authorizationHeader === expectedSecretKey) {
        // Authorized: Proceed to the next middleware or controller
        await next();
      } else {
        // Unauthorized: Return a 401 status and an error message
        ctx.response.status = 401;
        ctx.response.body = { error: 'Unauthorized access' };
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error validating secret key:', error);
      ctx.response.status = 500;
      ctx.response.body = { error: 'Internal server error' };
    }
  };
};
