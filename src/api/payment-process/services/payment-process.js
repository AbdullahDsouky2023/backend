'use strict';

/**
 * payment-process service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::payment-process.payment-process');
