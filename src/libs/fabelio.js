const puppeteer = require('puppeteer');

exports.fetchDataProduct = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const title = await page.$eval("head > meta[property='og:title']", (element) => element.content);
    const image = await page.$eval("head > meta[property='og:image']", (element) => element.content);
    const price = await page.$eval("head > meta[property='product:price:amount']", (element) => element.content);

    const appPrice = await page.$eval('.product-info-main', (element) => {
      let oldPrice = 0;
      let finalPrice = 0;
      Array.from(element.querySelectorAll('.price-wrapper')).map((d) => {
        if (d.getAttribute('data-price-type') === 'oldPrice') {
          oldPrice = d.getAttribute('data-price-amount');
        }
        if (d.getAttribute('data-price-type') === 'finalPrice') {
          finalPrice = d.getAttribute('data-price-amount');
        }
        return d.getAttribute('data-price-amount');
      });
      return {
        oldPrice,
        finalPrice,
      };
    });

    const currency = await page.$eval("head > meta[property='product:price:currency']", (element) => element.content);
    const images = await page.$eval('.fotorama__nav', (element) => {
      const resultImages = [];
      Array.from(element.querySelectorAll('.fotorama__img')).map((d) => {
        const fileName = d.getAttribute('src').substring(d.getAttribute('src').lastIndexOf('/') + 1);
        resultImages.push({
          thumbail: d.getAttribute('src'),
          full: `https://fabelio.com/pub/media/catalog/product/${fileName.substr(0, 1).toLowerCase()}/${fileName.substr(1, 1).toLowerCase()}/${fileName}`,
        });
        return d.getAttribute('src');
      });
      return resultImages;
    });
    const description = await page.$eval('#description', (el) => ({
      text: el.textContent,
      html: el.innerHTML,
    }));
    const descriptionAdditionalData = await page.$eval('.product-info__attributes__wrapper', (el) => ({
      text: el.textContent,
      html: el.innerHTML,
    }));

    await browser.close();
    return {
      url,
      title,
      image,
      price,
      appPrice,
      currency,
      images,
      description,
      descriptionAdditionalData,
      processedAt: new Date(),
    };
  } catch (error) {
    throw error;
  }
};
