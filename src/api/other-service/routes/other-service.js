'use strict';

/**
 * other-service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::other-service.other-service');
