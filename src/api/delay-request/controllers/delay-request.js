'use strict';

/**
 * delay-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::delay-request.delay-request');
