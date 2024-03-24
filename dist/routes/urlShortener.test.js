"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urlMappingModel_1 = __importDefault(require("../models/urlMappingModel"));
const urlShortener_1 = require("../routes/urlShortener");
const request = require('supertest');
const app = require('../app').default;
// Test the URL Mapping model
describe('UrlMapping', () => {
    test('should create a new UrlMapping object with the provided originalUrl and shortUrl', () => {
        const originalUrl = 'https://www.example.com';
        const shortUrl = 'https://shorturl.com/abc123';
        const urlMapping = new urlMappingModel_1.default({
            originalUrl,
            shortUrl,
        });
        expect(urlMapping.originalUrl).toBe(originalUrl);
        expect(urlMapping.shortUrl).toBe(shortUrl);
    });
});
// Test the URL Shortener API POST request
describe('URL Shortener API', () => {
    it('should return status 200 for valid URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/shorten/long_url')
            .send({ originalUrl: 'https://example.com' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('shortUrl');
    }));
    it('should return status 400 for invalid URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/shorten/long_url')
            .send({ originalUrl: '://example.com' });
        expect(response.status).toBe(400);
        expect(response.body).not.toHaveProperty('shortUrl');
    }));
    it('should return status 200 for duplicate URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/shorten/long_url')
            .send({ originalUrl: 'https://example.com' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('shortUrl');
    }));
});
//Test the URL Redirect API GET request
describe('URL Redirect API', () => {
    it('should return status 404 for invalid short URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get('/shorten/invalid_short_url');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }));
});
// To create redirection test, we need to have an actual database value , firt we will fetch it from the database and then test the redirection
describe('URL Redirect API', () => {
    let shortUrl = '';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/shorten/long_url')
            .send({ originalUrl: 'https://example.com' });
        shortUrl = response.body.shortUrl;
    }));
    it('should redirect to the original URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get(`/shorten/${shortUrl}`);
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('https://example.com');
    }));
});
// Test the URL Redirect API GET request
// Test the utility function isValidUrl
describe('isValidUrl', () => {
    test('should return true for a valid URL', () => {
        const validUrl = 'https://www.example.com';
        const result = (0, urlShortener_1.isValidUrl)(validUrl);
        expect(result).toBe(true);
    });
    test('should return false for an invalid URL', () => {
        const invalidUrl = '://example.com';
        const result = (0, urlShortener_1.isValidUrl)(invalidUrl);
        expect(result).toBe(false);
    });
});
// Test the utility function generateShortUrl
describe('generateShortUrl', () => {
    test('should return a short URL for a given original URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const originalUrl = 'https://www.example.com';
        const shortUrl = yield (0, urlShortener_1.generateShortUrl)(originalUrl);
        expect(shortUrl).not.toBeNull();
    }));
});
