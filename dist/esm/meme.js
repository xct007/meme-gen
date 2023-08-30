/**
 * @author FrierenDv
 */
import Jimp from "jimp";
import gm from "gm";
import { Options } from "./utils/index.js";
export class memeG extends Options {
    mimetype = Jimp.MIME_PNG;
    _gm;
    image_buffer;
    // TODO: use another method to get image from url.
    async _Jimp_init() {
        let _jimp;
        try {
            _jimp = await Jimp.read(this.init_image);
        }
        catch {
            _jimp = await new Promise((resolve, reject) => {
                new Jimp(512, 512, (err, image) => {
                    if (err)
                        return reject(err);
                    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                        this.bitmap.data[idx] = 0;
                        this.bitmap.data[idx + 1] = 0;
                        this.bitmap.data[idx + 2] = 0;
                    });
                    resolve(image);
                });
            });
        }
        this.image_buffer = await _jimp.getBufferAsync(this.mimetype);
        this.width = _jimp.bitmap.width;
        this.height = _jimp.bitmap.height;
    }
    _gm_init() {
        if (this._gm) {
            return;
        }
        if (Buffer.isBuffer(this.image_buffer)) {
            this._gm = gm(this.image_buffer);
        }
        else {
            throw new Error("image_buffer is not a Buffer");
        }
    }
    _draw_top(top_position, topFontSize) {
        this._gm.font(this.font, topFontSize);
        this._gm.gravity("North");
        this._gm.drawText(0, top_position, this.top_text, "center");
    }
    _draw_bottom(bottom_position, bottomFontSize) {
        this._gm.font(this.font, bottomFontSize);
        this._gm.gravity("South");
        this._gm.drawText(0, bottom_position, this.bottom_text, "center");
    }
    _draw() {
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
        this._draw_bottom(this.bottom_position(), this.calculate_bottom_font_size());
    }
    /**
     * create the meme and return buffer
     * @returns {Promise<Buffer>}
     */
    async getBufferAsync() {
        if (!this.image_buffer) {
            await this._Jimp_init();
        }
        this._draw();
        return new Promise((resolve, reject) => {
            this._gm.toBuffer("PNG", (err, buffer) => {
                if (err) {
                    console.error("Error:", err);
                    reject(err);
                }
                else {
                    resolve(buffer);
                }
            });
        });
    }
    /**
     *
     * @param {string} path - path output image
     * @returns {void}
     */
    async writeAsync(path) {
        if (!this.image_buffer) {
            await this._Jimp_init();
        }
        this._draw();
        return new Promise((resolve, reject) => {
            this._gm.write(path, (err) => {
                if (err) {
                    console.error("Error:", err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
