# MEME Gen Maker
Create meme top/bottom text.

![Example of meme created with Meme Maker](http://i.imgur.com/2s8NYvM.png)

You need install [graphicsmagick](http://www.graphicsmagick.org/index.html) in your system before using this package.

## Installation
- use `npm`
```bash
npm install github:xct007/meme-gen
```
- use `yarn`
```bash
yarn add github:xct007/meme-gen
```
- npm package `soon`

## Usage
- *Basic*
    ```js
    import { memeG } from "meme-gen";
    const meme = new memeG();

    // use image
    const input_image = "./danil.jpg";
    meme.image(input_image);

    // top text
    meme.top("Anjay");

    // bottom text
    meme.bottom("mabar");

    // make text upper case
    meme.upper_case();

    // create meme and save to disk
    const output = "./result.png";
    meme.writeAsync(output);

    // or get a image buffer
    meme.bufferAsync()
    ```
- *image options*
    ```js
    import { memeG } from "meme-gen";
    import { readFileSync } from "fs";

    const meme = new memeG();

    // local path
    meme.image("./danil_strok.jpg");

    // using url 
    meme.image("https://example.com/image.jpg");

    // buffer
    const image_buffer = readFilSync("./danil.jpg")
    meme.image(image_buffer)

    // by default it will use white blank image
    meme.image()
    ```
- *text options*
    ```js
    import { memeG } from "meme-gen";

    const meme = new memeG();

    // fill text color
    meme.fill("#FFF") // white #FFF

    // stroke/outline
    meme.stroke("#000") // black #000
    meme.stroke("#000", 2) // stroke width 2

    // make text upper case
    meme.uppe_case()

    // text padding width
    meme.padding_width(40) // default 40
    ```
- *load custom font*
    ```js
    import { memeG } from "meme-gen";

    const meme = new memeG();

    const font_path = "./myfont.ttf";

    meme.load_font(font_path)
    ```
- *advance*
    ```js
    import { memeG } from "meme-gen";
    
    const image_buffer = await meme
        .image("https://itsrose.life/rose.jpeg")
        .load_font("./my_font.ttf")
        .fill("#FFF")
        .stroke("#000", 2)
        .padding_width(40)
        .top("OMG")
        .bottom("I love you")
        .upper_case()
        .getBufferAsync()
    
    console.log(image_buffer);
    ```
## options
- top: top text input
- bottom: bottom text input
- stroke: stroke color and width ``` hex_color: string, stroke_width: number```
- upper_case: text to upper case
- padding_width: text top/bottom padding
- load_font: use custom font

## Note
This repository project is a learning exercise, and as such it utilizes references from other open source repositories. No commercial use is intended, and all efforts have been made to ensure proper attribution has been given to any referenced libraries and code.