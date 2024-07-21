'use strict';

/**
 * other-service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::other-service.other-service');
