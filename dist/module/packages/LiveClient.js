import { AbstractWsClient } from "./AbstractWsClient";
import { appendSearchParams } from "../lib/helpers";
import { DeepgramError } from "../lib/errors";
import { DEFAULT_OPTIONS } from "../lib/constants";
import { LiveConnectionState, LiveTranscriptionEvents } from "../lib/enums";
import { w3cwebsocket } from "websocket";
export class LiveClient extends AbstractWsClient {
  constructor(key, options = DEFAULT_OPTIONS, transcriptionOptions = {}, endpoint = "v1/listen") {
    super(key, options);
    this.key = key;
    this.options = options;
    this.transcriptionOptions = transcriptionOptions;
    const url = new URL(endpoint, this.baseUrl);
    url.protocol = url.protocol.toLowerCase().replace(/(http)(s)?/gi, "ws$2");
    appendSearchParams(url.searchParams, this.transcriptionOptions);
    this._socket = new w3cwebsocket(url.toString(), ["token", this.key]);
    this._socket.onopen = () => {
      this.emit(LiveTranscriptionEvents.Open, this);
    };
    this._socket.onclose = (event) => {
      this.emit(LiveTranscriptionEvents.Close, event);
    };
    this._socket.onerror = (event) => {
      this.emit(LiveTranscriptionEvents.Error, event);
    };
    this._socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.toString());
        if (data.type === LiveTranscriptionEvents.Metadata) {
          this.emit(LiveTranscriptionEvents.Metadata, data);
        }
        if (data.type === LiveTranscriptionEvents.Transcript) {
          this.emit(LiveTranscriptionEvents.Transcript, data);
        }
        if (data.type === LiveTranscriptionEvents.UtteranceEnd) {
          this.emit(LiveTranscriptionEvents.UtteranceEnd, event);
        }
      } catch (error) {
        this.emit(LiveTranscriptionEvents.Error, {
          event,
          message: "Unable to parse `data` as JSON.",
          error,
        });
      }
    };
  }
  configure(config) {
    this._socket.send(
      JSON.stringify({
        type: "Configure",
        processors: config,
      })
    );
  }
  keepAlive() {
    this._socket.send(
      JSON.stringify({
        type: "KeepAlive",
      })
    );
  }
  getReadyState() {
    return this._socket.readyState;
  }
  /**
   * Sends data to the Deepgram API via websocket connection
   * @param data Audio data to send to Deepgram
   *
   * Conforms to RFC #146 for Node.js - does not send an empty byte.
   * In the browser, a Blob will contain length with no audio.
   * @see https://github.com/deepgram/deepgram-python-sdk/issues/146
   */
  send(data) {
    if (this._socket.readyState === LiveConnectionState.OPEN) {
      if (typeof data === "string") {
        this._socket.send(data); // send text data
      } else if (data instanceof Blob) {
        this._socket.send(data); // send blob data
      } else {
        const buffer = data;
        if (buffer.byteLength > 0) {
          this._socket.send(buffer); // send buffer when not zero-byte (or browser)
        } else {
          this.emit(
            LiveTranscriptionEvents.Warning,
            "Zero-byte detected, skipping. Send `CloseStream` if trying to close the connection."
          );
        }
      }
    } else {
      throw new DeepgramError("Could not send. Connection not open.");
    }
  }
  /**
   * Denote that you are finished sending audio and close
   * the websocket connection when transcription is finished
   */
  finish() {
    // tell the server to close the socket
    this._socket.send(
      JSON.stringify({
        type: "CloseStream",
      })
    );
  }
}
//# sourceMappingURL=LiveClient.js.map
