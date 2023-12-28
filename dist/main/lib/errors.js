"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepgramUnknownError =
  exports.DeepgramApiError =
  exports.isDeepgramError =
  exports.DeepgramError =
    void 0;
class DeepgramError extends Error {
  constructor(message) {
    super(message);
    this.__dgError = true;
    this.name = "DeepgramError";
  }
}
exports.DeepgramError = DeepgramError;
function isDeepgramError(error) {
  return typeof error === "object" && error !== null && "__dgError" in error;
}
exports.isDeepgramError = isDeepgramError;
class DeepgramApiError extends DeepgramError {
  constructor(message, status) {
    super(message);
    this.name = "DeepgramApiError";
    this.status = status;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
    };
  }
}
exports.DeepgramApiError = DeepgramApiError;
class DeepgramUnknownError extends DeepgramError {
  constructor(message, originalError) {
    super(message);
    this.name = "DeepgramUnknownError";
    this.originalError = originalError;
  }
}
exports.DeepgramUnknownError = DeepgramUnknownError;
//# sourceMappingURL=errors.js.map
