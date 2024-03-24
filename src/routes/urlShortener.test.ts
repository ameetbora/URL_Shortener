
import UrlMapping from '../models/urlMappingModel';
const request = require('supertest');
const app = require('../index').default;

describe('UrlMapping', () => {
  test('should create a new UrlMapping object with the provided originalUrl and shortUrl', () => {
    const originalUrl = 'https://www.example.com';
    const shortUrl = 'https://shorturl.com/abc123';

    const urlMapping = new UrlMapping({
      originalUrl,
      shortUrl,
    });

    expect(urlMapping.originalUrl).toBe(originalUrl);
    expect(urlMapping.shortUrl).toBe(shortUrl);
  });
});


describe('URL Shortener API', () => {
    it('should return status 400 for invalid URL', async () => {
        const response = await request(app)
            .post('/shorten/long_url')
            .send({ originalUrl: '://example.com' });

        expect(response.status).toBe(400);
        expect(response.body).not.toHaveProperty('shortUrl');
    });
});



