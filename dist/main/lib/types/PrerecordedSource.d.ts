/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
export declare type PrerecordedSource = UrlSource | Buffer | Readable;
export declare type FileSource = Buffer | Readable;
export interface UrlSource {
  url: string;
}
//# sourceMappingURL=PrerecordedSource.d.ts.map
