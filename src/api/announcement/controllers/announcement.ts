/**
 * announcement controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::announcement.announcement', ({ strapi}) => ({
  async public(ctx) {
    await this.validateQuery(ctx);

    const sanitizedQueryParams = await this.sanitizeQuery(ctx) as {
      lang: 'fr' | 'en',
      channels: string
    }
    const channels = (sanitizedQueryParams.channels ?? '').split(',');

    const announcements = await strapi.entityService.findMany('api::announcement.announcement', {
      sort: { priority: 'desc', start_at: 'asc' },
      filters: {
        start_at: {
          $lte: new Date()
        },
        publishedAt: {
          $null: false
        },
        $or: [{ end_at: { $null: true } }, { end_at: { $gte: new Date() } }],
        language: sanitizedQueryParams.lang,
        channels: {
          name: {
            $in: channels
          }
        }
      },
      populate: ['main_action', 'primary_image', 'secondary_image']
    });

    const sanitizedResults = await this.sanitizeOutput(announcements, ctx);

    return this.transformResponse(sanitizedResults);
  }
}));
