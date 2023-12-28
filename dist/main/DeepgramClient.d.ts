import { AbstractClient } from "./packages/AbstractClient";
import { ListenClient } from "./packages/ListenClient";
import { ManageClient } from "./packages/ManageClient";
import { OnPremClient } from "./packages/OnPremClient";
/**
 * Deepgram Client.
 *
 * An isomorphic Javascript client for interacting with the Deepgram API.
 * @see https://developers.deepgram.com
 */
export default class DeepgramClient extends AbstractClient {
  get listen(): ListenClient;
  get manage(): ManageClient;
  get onprem(): OnPremClient;
}
//# sourceMappingURL=DeepgramClient.d.ts.map
