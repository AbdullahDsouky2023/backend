import type { Schema, Attribute } from '@strapi/strapi';

export interface NotificationsNotifications extends Schema.Component {
  collectionName: 'components_notifications_notifications';
  info: {
    displayName: 'notifications';
    icon: 'bell';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    body: Attribute.String;
    data: Attribute.String;
    date: Attribute.DateTime;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'notifications.notifications': NotificationsNotifications;
    }
  }
}
