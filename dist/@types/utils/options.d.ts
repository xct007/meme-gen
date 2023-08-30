import { Util } from "./util";
export declare class Options extends Util {
    /**
     * top text meme
     * @param {string} top_text - input top text
     * @returns
     */
    top(top_text: string): this;
    /**
     * bottom text meme
     * @param {string} bottom_text - input bottom text
     * @returns
     */
    bottom(bottom_text: string): this;
    /**
     * make text top and bottom upper case
     * @returns
     */
    upper_case(): this;
    /**
     * load custom font
     * @param {string} path - font path
     * @returns
     */
    load_font(path?: string): this;
    /**
     * image use for creating meme, if not set will use blank white 512x412
     * @param {string} init_image - image url/path or buffer
     * @returns
     */
    image(init_image: string): this;
    /**
     * set fill text color
     * @param {string} hex_color - hex color
     * @returns
     */
    fill(hex_color?: string): this;
    /**
     * set stroke color and width
     * @param {string} hex_color - hex color
     * @param {number} stroke_width - stroke width
     * @returns
     */
    stroke(hex_color?: string, stroke_width?: number): this;
    /**
     * Set padding width
     * @param {number} size - padding size
     * @returns
     */
    padding_width(size: number): this;
}
//# sourceMappingURL=options.d.ts.map