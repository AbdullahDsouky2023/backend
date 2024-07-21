'use strict';

/**
 * spare-part service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::spare-part.spare-part');
