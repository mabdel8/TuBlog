const axios = require('axios');
const cheerio = require('cheerio');

const scrapeTowsonSports = async () => {
  try {
    const { data } = await axios.get('https://towsontigers.com/');
    const $ = cheerio.load(data);
    const articles = [];

    $('.c-stories__item').each((index, element) => {
      const title = $(element).find('.c-stories__title').text().trim();
      const date = $(element).find('.c-stories__date').text().trim();
      const image = $(element).find('.c-stories__image').attr('data-src');

      articles.push({ title, date, image });
    });

    return articles;
  } catch (error) {
    console.error('Error scraping Towson sports:', error);
    return [];
  }
};

module.exports = scrapeTowsonSports;
