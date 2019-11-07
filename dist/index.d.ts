import { CanvasRenderingContext2D } from "canvas";
export interface DrawPngReplaceEmojiParams {
  text: string;
  fillStyle: string;
  font: string;
  x: number;
  y: number;
  emojiW: number;
  emojiH: number;
  length?: number;
}
export declare class CanvasEmoji {
  private canvasCtx;
  constructor(ctx: CanvasRenderingContext2D);
  getEmojiKeys(str: string): string[];
  replaceEmojiToEmojiName(
    str: string
  ): {
    str: string;
    emojiArr: any;
  };
  drawPngReplaceEmoji(
    data: DrawPngReplaceEmojiParams
  ): {
    x: number;
  };
  private showText;
}
