import type { Schema, Attribute } from '@strapi/strapi';

export interface ButtonLinkButton extends Schema.Component {
  collectionName: 'components_button_link_buttons';
  info: {
    displayName: 'LinkButton';
    icon: 'exit';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'button.link-button': ButtonLinkButton;
    }
  }
}
