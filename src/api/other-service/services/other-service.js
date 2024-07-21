'use strict';

/**
 * other-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::other-service.other-service');
