"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractClient_1 = require("./packages/AbstractClient");
const ListenClient_1 = require("./packages/ListenClient");
const ManageClient_1 = require("./packages/ManageClient");
const OnPremClient_1 = require("./packages/OnPremClient");
/**
 * Deepgram Client.
 *
 * An isomorphic Javascript client for interacting with the Deepgram API.
 * @see https://developers.deepgram.com
 */
class DeepgramClient extends AbstractClient_1.AbstractClient {
  get listen() {
    return new ListenClient_1.ListenClient(this.key, this.options);
  }
  get manage() {
    return new ManageClient_1.ManageClient(this.key, this.options);
  }
  get onprem() {
    return new OnPremClient_1.OnPremClient(this.key, this.options);
  }
}
exports.default = DeepgramClient;
//# sourceMappingURL=DeepgramClient.js.map
