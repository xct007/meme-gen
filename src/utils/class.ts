export class Class {
	init_image: string;
	top_text: string;
	bottom_text: string;
	font: string;
	width: number;
	height: number;
	padding: number;

	stroke_color!: string;
	stroke_width!: number;
	_stroke!: boolean;
	fill_color!: string;
	_fill!: boolean;
	constructor() {
		this.init_image = "";
		this.top_text = "";
		this.bottom_text = "";
		this.font = "";
		this.width = 0;
		this.height = 0;
		this.padding = 40;
	}
}
