const cron = require('node-cron');
const { products } = require('../config/db');
const { fetchDataProduct } = require('../libs/fabelio');

cron.schedule(` */${process.env.UPDATE_EVERY_SECONDS || 300} * * * * *`, async () => {
  try {
    // eslint-disable-next-line
    for (const product of products().data) {
      // eslint-disable-next-line no-await-in-loop
      const result = await fetchDataProduct(product.url);
      product.title = result.title;
      product.image = result.image;
      product.price = result.price;
      product.appPrice = result.appPrice;
      product.currency = result.currency;
      product.images = result.images;
      product.description = result.description;
      product.descriptionAdditionalData = result.descriptionAdditionalData;
      product.updatedAt = new Date();
      products().update(product);
      console.log(`Product ${product.id} has been updated at ${new Date()}`);
    }
  } catch (error) {
    console.log(error);
  }
});
