'use strict';

/**
 * delay-request router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::delay-request.delay-request');
