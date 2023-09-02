import { Class } from "./class";

export class Util extends Class {
	/**
	 * @description calculate top text position
	 * @returns {number}
	 */
	public top_position(): number {
		return Math.abs(this.height / 2 - this.padding) * -1;
	}
	/**
	 * @description calculate bottom text position
	 * @returns {number}
	 */
	public bottom_position(): number {
		return Math.abs(this.height / 2 - this.padding);
	}
	/**
	 * @description calculate top text font size
	 * @returns {number}
	 */
	public calculate_top_font_size(): number {
		return Math.max(
			Math.max(24, Math.min(this.width / 40, this.height / 40)),
			Math.min(
				Math.floor(Math.min(this.width / 5, this.height / 5)),
				Math.floor(600 / this.top_text.length),
			),
		);
	}
	/**
	 * @description calculate bottom text font size
	 * @returns {number}
	 */
	public calculate_bottom_font_size(): number {
		return Math.max(
			Math.max(24, Math.min(this.width / 40, this.height / 40)),
			Math.min(
				Math.floor(Math.min(this.width / 5, this.height / 5)),
				Math.floor(600 / this.bottom_text.length),
			),
		);
	}
}
