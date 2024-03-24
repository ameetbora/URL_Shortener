"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
/**
 * Represents the schema for URL mapping.
 */
const urlMappingSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
});
const UrlMapping = mongoose.model('UrlMapping', urlMappingSchema);
exports.default = UrlMapping;
