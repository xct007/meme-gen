import { Util } from "./util.js";
import { existsSync } from "fs";
import { FONT_IMPACT } from "./fonts.js";
export class Options extends Util {
    /**
     * top text meme
     * @param {string} top_text - input top text
     * @returns
     */
    top(top_text) {
        this.top_text = top_text;
        return this;
    }
    /**
     * bottom text meme
     * @param {string} bottom_text - input bottom text
     * @returns
     */
    bottom(bottom_text) {
        this.bottom_text = bottom_text;
        return this;
    }
    /**
     * make text top and bottom upper case
     * @returns
     */
    upper_case() {
        this.top_text = this.top_text.toUpperCase();
        this.bottom_text = this.bottom_text.toUpperCase();
        return this;
    }
    /**
     * load custom font
     * @param {string} path - font path
     * @returns
     */
    load_font(path = FONT_IMPACT) {
        if (!existsSync(path)) {
            throw new Error("Path font not set");
        }
        this.font = path;
        return this;
    }
    /**
     * image use for creating meme, if not set will use blank white 512x412
     * @param {string} init_image - image url/path or buffer
     * @returns
     */
    image(init_image) {
        this.init_image = init_image;
        return this;
    }
    /**
     * set fill text color
     * @param {string} hex_color - hex color
     * @returns
     */
    fill(hex_color = "#FFF") {
        this.fill_color = hex_color;
        return this;
    }
    /**
     * set stroke color and width
     * @param {string} hex_color - hex color
     * @param {number} stroke_width - stroke width
     * @returns
     */
    stroke(hex_color = "#000", stroke_width = 2) {
        this.stroke_color = hex_color;
        this.stroke_width = stroke_width;
        return this;
    }
    /**
     * Set padding width
     * @param {number} size - padding size
     * @returns
     */
    padding_width(size) {
        this.padding = size;
        return this;
    }
}
