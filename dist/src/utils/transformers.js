"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimString = trimString;
exports.trimStringArray = trimStringArray;
function trimString({ value }) {
    if (typeof value !== 'string')
        return value;
    return value.trim().replace(/\s+/g, ' ');
}
function trimStringArray({ value }) {
    if (!Array.isArray(value))
        return value;
    return value.map((v) => typeof v === 'string' ? v.trim().replace(/\s+/g, ' ') : v);
}
//# sourceMappingURL=transformers.js.map