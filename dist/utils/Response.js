"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApertreResponse = ApertreResponse;
function ApertreResponse({ isSuccess, message, data }) {
    return {
        success: isSuccess ? 'ok' : 'no',
        message: message || '',
        data: data || {}
    };
}
