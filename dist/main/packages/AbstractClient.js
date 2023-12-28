"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractClient = void 0;
const constants_1 = require("../lib/constants");
const errors_1 = require("../lib/errors");
const helpers_1 = require("../lib/helpers");
/**
 * Deepgram Client.
 *
 * An isomorphic Javascript client for interacting with the Deepgram API.
 * @see https://developers.deepgram.com
 */
class AbstractClient {
  constructor(key, options) {
    var _a, _b;
    this.key = key;
    this.options = options;
    this.key = key;
    if (!key) {
      this.key = process.env.DEEPGRAM_API_KEY;
    }
    if (!this.key) {
      throw new errors_1.DeepgramError("A deepgram API key is required");
    }
    this.options = (0, helpers_1.applySettingDefaults)(options, constants_1.DEFAULT_OPTIONS);
    if (!((_a = this.options.global) === null || _a === void 0 ? void 0 : _a.url)) {
      throw new errors_1.DeepgramError(
        `An API URL is required. It should be set to ${constants_1.DEFAULT_URL} by default. No idea what happened!`
      );
    }
    if (this.willProxy()) {
      if (this.key !== "proxy") {
        throw new errors_1.DeepgramError(
          `Do not attempt to pass any other API key than the string "proxy" when making proxied REST requests. Please ensure your proxy application is responsible for writing our API key to the Authorization header.`
        );
      }
      this.baseUrl = this.resolveBaseUrl(
        (_b = this.options.restProxy) === null || _b === void 0 ? void 0 : _b.url
      );
      if (this.options.global.headers) {
        this.options.global.headers["X-Deepgram-Proxy"] = this.options.global.url;
      }
    } else {
      this.baseUrl = this.resolveBaseUrl(this.options.global.url);
    }
  }
  resolveBaseUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    return new URL((0, helpers_1.stripTrailingSlash)(url));
  }
  willProxy() {
    var _a;
    const proxyUrl = (_a = this.options.restProxy) === null || _a === void 0 ? void 0 : _a.url;
    return !!proxyUrl;
  }
}
exports.AbstractClient = AbstractClient;
//# sourceMappingURL=AbstractClient.js.map
