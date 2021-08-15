const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = 500;
const height = 500;

canvas.width = width;
canvas.height = height;

const center = {
  x: width / 2,
  y: width / 2,
};

console.log(ctx);

const armSize = {
  width: width / 4,
  height: 20,
};

const renderAxis = (x, y, size = 25) => {
  ctx.beginPath();
  ctx.fillStyle = '#b8c1c6';
  ctx.strokeStyle = '#eee';
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = '#4c4648';
  ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

ctx.save();
ctx.beginPath();
ctx.strokeStyle = '#b8c1c6';
ctx.lineWidth = armSize.height;
ctx.lineCap = 'round';

ctx.moveTo(center.x, center.y);
ctx.lineTo(center.x - armSize.width, center.y);
ctx.stroke();

ctx.restore();

ctx.save();
ctx.beginPath();
ctx.strokeStyle = '#b8c1c6';
ctx.lineWidth = armSize.height;

ctx.moveTo(center.x - armSize.width, center.y);
ctx.lineTo(center.x - armSize.width * 2, center.y);
ctx.stroke();

ctx.restore();

ctx.beginPath(); // 테두리
ctx.fillStyle = '#b8c1c6';
ctx.arc(center.x, center.y, width / 2, 0, Math.PI * 2);
ctx.stroke();

// 중앙
ctx.beginPath();
ctx.fillStyle = '#b8c1c6';
ctx.arc(center.x, center.y, 25, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = '#4c4648';
ctx.arc(center.x, center.y, 15, 0, Math.PI * 2);
ctx.fill();

renderAxis(center.x, center.y);

renderAxis(center.x - armSize.width, center.y, 18);