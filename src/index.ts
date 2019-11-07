import { Image, CanvasRenderingContext2D } from 'canvas';
// @ts-ignore
import * as emoji from 'node-emoji';
import * as fs from 'fs';
import * as path from 'path';

export interface DrawPngReplaceEmojiParams {
  text: string,
  fillStyle: string,
  font: string,
  x: number,
  y: number,
  emojiW: number,
  emojiH: number,
  length?: number
}

export class CanvasEmoji {
  private canvasCtx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.canvasCtx = ctx
  }

  /**
   * 获取字符串中所有的emoji表情的名称
   * @param str
   */
  getEmojiKeys(str: string) {
    const emojiArr: string[] = [];
    emoji.replace(str, (item: any) => {
      emojiArr.push(`${item.key}`);
    });
    return emojiArr;
  }

  /**
   * 替换全部的表情变为名称并用
   * @param str
   */
  replaceEmojiToEmojiName(str: string) {
    const emojiArr: any = [];
    str = emoji.replace(str, (item: any) => {
      emojiArr.push(`{${item.key}}`);
      return `{${item.key}}`;
    });
    return {
      str,
      emojiArr,
    };
  }

  /**
   *
   * @param data
   */
  drawPngReplaceEmoji(data: DrawPngReplaceEmojiParams) {
    const { canvasCtx } = this;
    const {
      fillStyle,
      font,
      y,
      emojiW,
      emojiH,
    } = data;
    let { text, x, length } = data;
    canvasCtx.fillStyle = fillStyle;
    canvasCtx.font = font;
    const emojiArr: string[] = [];
    text = emoji.replace(text, (item: any) => {
      emojiArr.push(`{${item.key}}`);
      return `{${item.key}}`;
    });
    let ctxText;
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
      const emojiImg = new Image();
      emojiImg.src = fs.readFileSync(path.join(__dirname, `../emoji_pngs/${emojiItem.replace('{', '').replace('}', '')}.png`));
      canvasCtx.drawImage(emojiImg, x, y - (emojiH / 2), emojiW, emojiH);
      x += 36;
      text = text.substr(index + emojiItem.length);
      if (length !== -1) {
        length -= (text.substring(0, index).length + 1);
        if (length === 0) {
          canvasCtx.fillText('...', x, 1300);
          ctxText = canvasCtx.measureText('...');
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

  private showText(text: string, length: number = 10) {
    if (text.length > length) {
      return text.slice(0, length) + '...';
    } else {
      return text;
    }
  }

}
