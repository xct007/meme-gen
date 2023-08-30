/**
 * @author FrierenDv
 */
/// <reference types="node" />
import { Options } from "./utils.js";
export declare class memeG extends Options {
    private mimetype;
    private _gm;
    private image_buffer;
    private _Jimp_init;
    private _gm_init;
    private _draw_top;
    private _draw_bottom;
    private _draw;
    /**
     * create the meme and return buffer
     * @returns {Promise<Buffer>}
     */
    getBufferAync(): Promise<Buffer>;
    /**
     *
     * @param {string} path - path output image
     * @returns {void}
     */
    writeAsync(path: string): Promise<void>;
}
