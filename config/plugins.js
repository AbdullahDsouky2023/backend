module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },'strapi-plugin-populate-deep': {
      config: {
        defaultDepth: 5, // Default is 5
        
      }
    },
    io: {
      enabled: true,
      config: {
        // This will listen for all supported events on the article content type
        contentTypes: ['api::order.order'],
      },
    },
  });