import { width, height, center, armSize } from './constants';

const Renderer = (ctx) => {
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
  
  const renderBorder = () => {
    ctx.beginPath(); // 테두리
    ctx.fillStyle = '#b8c1c6';
    ctx.arc(center.x, center.y, width / 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  const renderArm = (x = width / 4) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#b8c1c6';
    ctx.lineWidth = armSize.height;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  
    const from = {...center};
    const to = {
      x,
      y: height / 2
    };
  
    
    const middle = (from.x - to.x) / 2;
    
    const top = Math.sqrt(Math.pow(armSize.width, 2) - Math.pow(middle, 2));
    
    console.log(top);
    
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(from.x - middle, from.y - top);
    // ctx.stroke();
  
    // ctx.restore();
  
    // ctx.save();
    // ctx.beginPath();
    // ctx.strokeStyle = '#b8c1c6';
    // ctx.lineWidth = armSize.height;
  
    // ctx.moveTo(center.x - armSize.width, center.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  
    ctx.restore();
  
    renderAxis(from.x - middle, from.y - top, 18);
  }

  const renderCenterAxis = () => {
    ctx.beginPath();
    ctx.fillStyle = '#b8c1c6';
    ctx.arc(center.x, center.y, 25, 0, Math.PI * 2);
    ctx.fill();
  
    ctx.beginPath();
    ctx.fillStyle = '#4c4648';
    ctx.arc(center.x, center.y, 15, 0, Math.PI * 2);
    ctx.fill();
  
    renderAxis(center.x, center.y);
  }

  const render = (x) => {
    ctx.canvas.width = ctx.canvas.width;

    renderBorder();
    renderArm(x);
    renderCenterAxis();
  }

  return {
    renderAxis,
    renderBorder,
    renderArm,
    renderCenterAxis,
    render,
  };
}

export default Renderer;