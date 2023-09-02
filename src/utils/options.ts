import { FONT_IMPACT } from "./fonts.js";
import { Util } from "./util";
import { existsSync } from "fs";

export class Options extends Util {
	/**
	 * @description top text meme
	 * @param {string} top_text - input top text
	 * @returns
	 */
	public top(top_text: string) {
		this.top_text = top_text;
		return this;
	}
	/**
	 * @description bottom text meme
	 * @param {string} bottom_text - input bottom text
	 * @returns
	 */
	public bottom(bottom_text: string) {
		this.bottom_text = bottom_text;
		return this;
	}
	/**
	 * @description make text top and bottom upper case
	 * @returns
	 */
	public upper_case(): this {
		this.top_text = this.top_text.toUpperCase();
		this.bottom_text = this.bottom_text.toUpperCase();
		return this;
	}
	/**
	 * @description load custom font
	 * @param {string} path - font path
	 * @returns
	 */
	public load_font(path: string = FONT_IMPACT): this {
		if (!existsSync(path)) {
			throw new Error("Path font not set");
		}
		this.font = path;
		return this;
	}
	/**
	 * @description image use for creating meme, if not set will use blank white 512x412
	 * @param {string} init_image - image url/path or buffer
	 * @returns
	 */
	public image(init_image: string): this {
		this.init_image = init_image;
		return this;
	}
	/**
	 * @description set fill text color
	 * @param {string} hex_color - hex color
	 * @returns
	 */
	public fill(hex_color: string = "#FFF"): this {
		this.fill_color = hex_color;
		return this;
	}
	/**
	 * @description set stroke color and width
	 * @param {string} hex_color - hex color
	 * @param {number} stroke_width - stroke width
	 * @returns
	 */
	public stroke(hex_color: string = "#000", stroke_width: number = 2): this {
		this.stroke_color = hex_color;
		this.stroke_width = stroke_width;
		return this;
	}
	/**
	 * @description set padding width
	 * @param {number} size - padding size
	 * @returns
	 */
	public padding_width(size: number): this {
		this.padding = size;
		return this;
	}
}
