import { Class } from "./class";

export class Util extends Class {
	public top_position(): number {
		return Math.abs(this.height / 2 - this.padding) * -1;
	}
	public bottom_position(): number {
		return Math.abs(this.height / 2 - this.padding);
	}
	public calculate_top_font_size(): number {
		return Math.max(
			Math.max(24, Math.min(this.width / 40, this.height / 40)),
			Math.min(
				Math.floor(Math.min(this.width / 5, this.height / 5)),
				Math.floor(600 / this.top_text.length),
			),
		);
	}
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
