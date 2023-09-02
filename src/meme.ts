/**
 * @author FrierenDv
 */

import Jimp from "jimp";
import gm from "gm";

import { Options } from "./utils/index";

export class memeG extends Options {
	protected mimetype: string = Jimp.MIME_PNG;
	protected _gm!: gm.State;
	protected image_buffer!: Buffer;

	//
	/**
	 * TODO: use another method to get image from url instead using jimp
	 * TODO: use another method to create image instead using new Jimp
	 * @description init jimp
	 * @returns {Promise<void>}
	 */
	protected async _Jimp_init(): Promise<void> {
		let _jimp: Jimp;
		try {
			_jimp = await Jimp.read(this.init_image);
		} catch {
			_jimp = await new Promise((resolve, reject) => {
				new Jimp(this.width, this.height, (err, image) => {
					if (err) return reject(err);
					image.scan(
						0,
						0,
						image.bitmap.width,
						image.bitmap.height,
						function (_x, _y, idx) {
							this.bitmap.data[idx] = 0;
							this.bitmap.data[idx + 1] = 0;
							this.bitmap.data[idx + 2] = 0;
						},
					);
					resolve(image);
				});
			});
		}
		this.image_buffer = await _jimp.getBufferAsync(this.mimetype);
		this.width = _jimp.bitmap.width;
		this.height = _jimp.bitmap.height;
	}
	/**
	 * @description init gm
	 * @returns {void}
	 */
	protected _gm_init(): void {
		if (this._gm) {
			return;
		}
		if (Buffer.isBuffer(this.image_buffer)) {
			this._gm = gm(this.image_buffer);
		} else {
			throw new Error("image_buffer is not a Buffer");
		}
	}
	/**
	 * @description calculate top text position
	 * @param {number} top_position - top position
	 * @param {number} top_font_size - font size
	 * @returns {void}
	 */
	protected _draw_top(top_position: number, top_font_size: number): void {
		this._gm.font(this.font, top_font_size);
		this._gm.gravity("North");
		this._gm.drawText(0, top_position, this.top_text, "center");
	}
	/**
	 * @description calculate font size for bottom text
	 * @param {number} bottom_position - bottom position
	 * @param {number} bottom_font_size - font size
	 * @returns {void}
	 */
	protected _draw_bottom(
		bottom_position: number,
		bottom_font_size: number,
	): void {
		this._gm.font(this.font, bottom_font_size);
		this._gm.gravity("South");
		this._gm.drawText(0, bottom_position, this.bottom_text, "center");
	}
	/**
	 * @description calculate top text position
	 * @returns {void}
	 */
	protected _draw(): void {
		if (!this._gm) {
			this._gm_init();
		}
		if (!this.font) {
			this.load_font();
		}
		if (!this._stroke) {
			this.stroke();
		}
		if (!this._fill) {
			this.fill();
		}
		this._gm.stroke(this.stroke_color, this.stroke_width);
		this._gm.fill(this.fill_color);

		this._draw_top(this.top_position(), this.calculate_top_font_size());
		this._draw_bottom(
			this.bottom_position(),
			this.calculate_bottom_font_size(),
		);
	}
	/**
	 * @description create the meme and return buffer
	 * @returns {Promise<Buffer>}
	 */
	public async getBufferAsync(): Promise<Buffer> {
		if (!this.image_buffer) {
			await this._Jimp_init();
		}
		this._draw();
		return new Promise((resolve, reject) => {
			this._gm.toBuffer("PNG", (err, buffer) => {
				if (err) {
					console.error("Error:", err);
					reject(err);
				} else {
					resolve(buffer);
				}
			});
		});
	}

	/**
	 * @description create the meme and write to file
	 * @param {string} path - path output image
	 * @returns {string} path
	 */
	public async writeAsync(path: string): Promise<string> {
		if (!this.image_buffer) {
			await this._Jimp_init();
		}
		this._draw();
		return new Promise((resolve, reject) => {
			this._gm.write(path, (err) => {
				if (err) {
					console.error("Error:", err);
					reject(err);
				} else {
					resolve(path);
				}
			});
		});
	}
}
