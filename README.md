# canvas-emoji

## Installation

```bash
$ npm install -save canvas-emoji
```

By default, binaries for macOS, Linux and Windows will be downloaded. If you want to build from source, use `npm install --build-from-source` and see the **Compiling** section below.

The minimum version of Node.js required is **6.0.0**.

### Compiling

If you don't have a supported OS or processor architecture, or you use `--build-from-source`, the module will be compiled on your system. This requires several dependencies, including Cairo and Pango.

For detailed installation information, see the [wiki](https://github.com/Automattic/node-canvas/wiki/_pages). One-line installation instructions for common OSes are below. Note that libgif/giflib, librsvg and libjpeg are optional and only required if you need GIF, SVG and JPEG support, respectively. Cairo v1.10.0 or later is required.

| OS      | Command                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------- |
| OS X    | Using [Homebrew](https://brew.sh/):<br/>`brew install pkg-config cairo pango libpng jpeg giflib librsvg` |
| Ubuntu  | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev` |
| Fedora  | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`                      |
| Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`                              |
| OpenBSD | `doas pkg_add cairo pango png jpeg giflib`                                                               |
| Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)                     |
| Others  | See the [wiki](https://github.com/Automattic/node-canvas/wiki)                                           |

**Mac OS X v10.11+:** If you have recently updated to Mac OS X v10.11+ and are experiencing trouble when compiling, run the following command: `xcode-select --install`. Read more about the problem [on Stack Overflow](http://stackoverflow.com/a/32929012/148072).
If you have xcode 10.0 or higher installed, in order to build from source you need NPM 6.4.1 or higher.

## Quick Example

```javascript
const { createCanvas } = require("canvas");
const { CanvasEmoji } = require("canvas-emoji");
const fs = require("fs");

function drawPngReplaceEmoji() {
    const canvas = createCanvas(800, 200);
    const canvasCtx = canvas.getContext("2d");
    const canvasEmoji = new CanvasEmoji(canvasCtx);
    const a = canvasEmoji.drawPngReplaceEmoji({
        text: "测试一下哦💋💃测试一下💋测试一下💋💃测试一下💋测试一下💋💃",
        fillStyle: "#000000",
        font: "bold 12px Impact",
        x: 0,
        y: 100,
        emojiW: 12,
        emojiH: 12,
        length: 20
    });
    const out = fs.createWriteStream(__dirname + "/test.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
    return a;
}

async function drawPngReplaceEmojiWithEmojicdn() {
    const canvas = createCanvas(800, 200);
    const canvasCtx = canvas.getContext("2d");
    const canvasEmoji = new CanvasEmoji(canvasCtx);
    const a = await canvasEmoji.drawPngReplaceEmojiWithEmojicdn({
        text: "测试一下哦💋💃测试一下💋测试一下💋💃测试一下💋测试一下💋💃",
        fillStyle: "#000000",
        font: "bold 12px Impact",
        x: 0,
        y: 100,
        emojiW: 12,
        emojiH: 12,
        length: 20,
        emojiStyle: 'apple'
    });
    const out = fs.createWriteStream(__dirname + "/test2.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
    return a;
}

console.log(drawPngReplaceEmoji());
drawPngReplaceEmojiWithEmojicdn();
```
### Method
```typescript
// Use local images, faster
drawPngReplaceEmoji(data: DrawPngReplaceEmojiParams): {x: number;}; 

// This method uses network pictures, and the style is more comprehensive
drawPngReplaceEmojiWithEmojicdn(data: DrawPngReplaceEmojiParams): Promise<{ x: number; }>;
```

### 参数

| 参数      | 描述                                                     | 类型     | 是否必须 | default |
| --------- |--------------------------------------------------------|--------| -------- |---------|
| text      | 可能含有 emoji 表情的字符串                                      | string | 是       |
| fillStyle | canvas 的 fillStyle                                     | string | 是       |
| font      | canvas 的 font                                          | string | 是       |
| x         | Canvas 坐标 x                                            | number | 是       |
| y         | Canvas 坐标 y                                            | number | 是       |
| emojiW    | emoji 表情的宽度                                            | number | 是       |
| emojiH    | emoji 表情的高度                                            | number | 是       |
| length    | 如果字符太长后面会超过 length 大小的会用...表示                          | number | 否       |
| emojiStyle    | emoji样式,only support drawPngReplaceEmojiWithEmojicdn() | string | 否       | google  |

####Supported emojiStyle styles:
- apple
- google
- microsoft
- samsung
- whatsapp
- twitter
- facebook
- messenger
- joypixels
- openmoji
- emojidex
- lg
- htc
- mozilla

### 返回

| 字段 | 描述                   |
| ---- | ---------------------- |
| x    | 完成后的 Canvas 坐标 x |

