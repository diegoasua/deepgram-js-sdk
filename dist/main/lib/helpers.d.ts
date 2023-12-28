import { DeepgramClientOptions, FileSource, PrerecordedSource, UrlSource } from "./types";
export declare function stripTrailingSlash(url: string): string;
export declare const isBrowser: () => boolean;
export declare const isServer: () => boolean;
export declare function applySettingDefaults(
  options: DeepgramClientOptions,
  defaults: DeepgramClientOptions
): DeepgramClientOptions;
export declare function appendSearchParams(
  searchParams: URLSearchParams,
  options: Record<string, unknown>
): void;
export declare const resolveHeadersConstructor: () => {
  new (init?: HeadersInit | undefined): Headers;
  prototype: Headers;
};
export declare const isUrlSource: (
  providedSource: PrerecordedSource
) => providedSource is UrlSource;
export declare const isFileSource: (
  providedSource: PrerecordedSource
) => providedSource is FileSource;
export declare class CallbackUrl extends URL {
  private callbackUrl;
}
//# sourceMappingURL=helpers.d.ts.map
