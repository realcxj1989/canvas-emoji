import { CanvasRenderingContext2D } from "canvas";
export interface DrawPngReplaceEmojiParams {
    text: string;
    color: string;
    x: number;
    y: number;
    fontSize?: number;
    fontFamily?: string;
    fontStyle? : string;
    fontVariant? : string;
    fontWeight? : string;
    textBaseline? : string;
    textAlign? : string;
    length?: number;
}
export declare class CanvasEmoji {
    private canvasCtx;
    constructor(ctx: CanvasRenderingContext2D);
    getEmojiKeys(str: string): string[];
    replaceEmojiToEmojiName(str: string): {
        str: string;
        emojiArr: any;
    };
    drawPngReplaceEmoji(data: DrawPngReplaceEmojiParams): {
        x: number;
    };
    private showText;
}
