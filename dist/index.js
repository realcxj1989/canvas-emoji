"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const emoji = require("node-emoji");
const fs = require("fs");
const path = require("path");
class CanvasEmoji {
    constructor(ctx) {
        this.canvasCtx = ctx;
    }
    getEmojiKeys(str) {
        const emojiArr = [];
        emoji.replace(str, (item) => {
            emojiArr.push(`${item.key}`);
        });
        return emojiArr;
    }
    replaceEmojiToEmojiName(str) {
        const emojiArr = [];
        str = emoji.replace(str, (item) => {
            emojiArr.push(`{${item.key}}`);
            return `{${item.key}}`;
        });
        return {
            str,
            emojiArr
        };
    }
    drawPngReplaceEmoji(data) {
        const { canvasCtx } = this;
        const {
            color,
            fontSize = 12,
            fontStyle = 'normal',
            fontFamily = 'Microsoft YaHei',
            fontVariant = 'normal',
            fontWeight = 'normal',
            textBaseline = 'middle',
            textAlign = 'left'
          } = data;
        let { text, x, y, length } = data;
        let otext = text;
        canvasCtx.fillStyle = color;
        canvasCtx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px  ${fontFamily}`;
        const emojiArr = [];
        text = emoji.replace(text, (item) => {
            emojiArr.push(`{${item.key}}`);
            return `{${item.key}}`;
        });
        if (textAlign === 'right' || textAlign === 'end' || textAlign === 'center') {
            let wordText = emoji.replace(otext, (item) => '');
            let w = canvasCtx.measureText(wordText).width;
            w = w + 1.2 * emojiArr.length * fontSize;
            if (textAlign === 'center') {
                x = x - 0.5 * w;
            } else {
                x = x - w;
            }
        }
        y = y - 0.15 * fontSize
        switch (textBaseline) {
            case 'middle':
                y = y + 0.5 * fontSize
                break;
            case 'top':
                y = y + fontSize
                break;
        }
        let ctxText;
        let i = 0;
        for (const emojiItem of emojiArr) {
            const index = text.indexOf(emojiItem);
            if (length !== -1 && length - text.substring(0, index).length <= 0) {
                canvasCtx.fillText(`${text.substring(0, length)}...`, x, y);
                ctxText = this.canvasCtx.measureText(`${text.substring(0, length)}...`);
                x += ctxText.width;
                break;
            }
            canvasCtx.fillText(text.substring(0, index), x, y);
            ctxText = canvasCtx.measureText(text.substring(0, index));
            x += ctxText.width;
            const emojiImg = new canvas_1.Image();
            emojiImg.src = fs.readFileSync(path.join(__dirname, `../emoji_pngs/${emojiItem.replace("{", "").replace("}", "")}.png`));
            canvasCtx.drawImage(emojiImg, x + 0.05 * fontSize, y - 0.95 * fontSize, 1.1 * fontSize, 1.1 * fontSize);
            x += 1.2 * fontSize
            text = text.substr(index + emojiItem.length);
            i++;
            if (i === emojiArr.length) {
                canvasCtx.fillText(text, x, y);
                ctxText = canvasCtx.measureText(text);
                x += ctxText.width;
            }
            if (length !== -1) {
                length -= text.substring(0, index).length + 1;
                if (length === 0) {
                    canvasCtx.fillText("...", x, y);
                    ctxText = canvasCtx.measureText("...");
                    x += ctxText.width;
                    break;
                }
            }
        }
        if (emojiArr.length === 0) {
            if (length) {
                text = this.showText(text, length);
            }
            canvasCtx.fillText(text, x, y);
            const ctxText = canvasCtx.measureText(text);
            x += ctxText.width;
        }
        return { x };
    }
    showText(text, length = 10) {
        if (text.length > length) {
            return text.slice(0, length) + "...";
        }
        else {
            return text;
        }
    }
}
exports.CanvasEmoji = CanvasEmoji;
//# sourceMappingURL=index.js.map