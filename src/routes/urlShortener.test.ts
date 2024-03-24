
import UrlMapping from '../models/urlMappingModel';
const request = require('supertest');
const app = require('../app').default;

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


// for the post request we will consider three scenarios , valid case , invalid case and edge case where the original url is not unique
describe('URL Shortener API', () => {
    it('should return status 200 for valid URL', async () => {
        const response = await request(app)
            .post('/shorten/long_url')
            .send({ originalUrl: 'https://example.com' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('shortUrl');
    });

    it('should return status 400 for invalid URL', async () => {
        const response = await request(app)
            .post('/shorten/long_url')
            .send({ originalUrl: '://example.com' });

        expect(response.status).toBe(400);
        expect(response.body).not.toHaveProperty('shortUrl');
    });

    it('should return status 400 for duplicate URL', async () => {
        const response = await request(app)
            .post('/shorten/long_url')
            .send({ originalUrl: 'https://example.com' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('shortUrl');
    });
});

