module.exports = (word, gridSize) => {
  const dotArray = [];
  const canvas = document.createElement('canvas');
  canvas.width = gridSize;
  canvas.height = gridSize;
  const cw = canvas.width;
  const ch = canvas.height;

  const context = canvas.getContext('2d');
  context.font = `${gridSize}px "Helvetica"`;
  context.textBaseline = 'top';
  context.textAlign = 'left';
  context.fillStyle = 'rgb(0, 0, 0)';
  context.clearRect(0, 0, cw, ch);
  for(let i = 0; i < word.length; i++) {
    context.clearRect(0, 0, cw, ch);
    context.fillText(word[i], 0, 0);
    const imgData = context.getImageData(0, 0, cw, ch);
    const pixels = imgData.data;
    // document.body.appendChild(canvas);

    for(let h = 0; h < ch; h++) {
      const row = [];
      for (let w = 0; w < cw; w++) {
        const colorBasePos = (w + h * cw) * 4  +3;
        const alpha = pixels[colorBasePos];
        row.push(alpha > 127);
      }
      dotArray.push(row);
    }

  }

  return dotArray;
}
