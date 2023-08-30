"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const class_1 = require("./class");
class Util extends class_1.Class {
    top_position() {
        return Math.abs(this.height / 2 - this.padding) * -1;
    }
    bottom_position() {
        return Math.abs(this.height / 2 - this.padding);
    }
    calculate_top_font_size() {
        return Math.max(Math.max(24, Math.min(this.width / 40, this.height / 40)), Math.min(Math.floor(Math.min(this.width / 5, this.height / 5)), Math.floor(600 / this.top_text.length)));
    }
    calculate_bottom_font_size() {
        return Math.max(Math.max(24, Math.min(this.width / 40, this.height / 40)), Math.min(Math.floor(Math.min(this.width / 5, this.height / 5)), Math.floor(600 / this.bottom_text.length)));
    }
}
exports.Util = Util;
