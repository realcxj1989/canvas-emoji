const { createCanvas } = require('canvas');
const { CanvasEmoji } = require('../dist/index');
const fs = require('fs');

function test() {
  const canvas = createCanvas(1500, 200);
  const canvasCtx = canvas.getContext('2d');
  const canvasEmoji = new CanvasEmoji(canvasCtx);
  const a = canvasEmoji.drawPngReplaceEmoji({
    text: '测试一下哦💋💃测试一下💋测试一下💋💃测试一下💋测试一下💋💃👉',
    fillStyle: '#000000',
    font: 'bold 36px Impact',
    x: 0,
    y: 100,
    emojiW: 36,
    emojiH: 36,
  });
  const out = fs.createWriteStream(__dirname + '/test.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('The PNG file was created.'));
  return a;
}

console.log(test());
