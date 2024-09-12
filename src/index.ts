
const conditions = [
  {
    displayName: 'Has partner access',
    name: 'has-partner-access',
    plugin: 'admin',
    handler: async (user) => {
      const partners = await strapi.entityService.findMany('api::partner.partner', {
        populate: ['channels'],
        filters: {
          users: {
            id: user.id
          }
        }
      });

      if(partners.length === 0) {
        return false;
      }

      const authorizedChannel = partners[0].channels.map((channel) => channel.name)

      return {
        $or: [
          {
            "channels.name": {
              $in: [...authorizedChannel, null]
            },
          },
          {
            "name": {
              $in: [...authorizedChannel, null]
            }
          }
        ]
      };
    },
  }
]

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/*{ strapi }*/) {
    await strapi.admin.services.permission.conditionProvider.registerMany(conditions);
  },
};
