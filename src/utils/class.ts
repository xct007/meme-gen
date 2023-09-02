export class Class {
	init_image: string;
	/**
	 * top text meme - use top() method
	 */
	top_text: string;
	/**
	 * bottom text meme - use bottom() method
	 */
	bottom_text: string;
	/**
	 * font path - use load_font() method
	 */
	font: string;
	/**
	 * width and height image - use image() method	
	 */
	width: number;
	height: number;
	/**
	 * padding between text and image - use padding_width() method
	 */
	padding: number;
	/**
	 * stroke color - use stroke() method
	 */
	stroke_color!: string;
	stroke_width!: number;
	_stroke!: boolean;
	/**
	 * fill color - use fill() method
	 */
	fill_color!: string;
	_fill!: boolean;
	constructor() {
		this.init_image = "";
		this.top_text = "";
		this.bottom_text = "";
		this.font = "";
		this.width = 512;
		this.height = 512;
		this.padding = 40;
	}
}
