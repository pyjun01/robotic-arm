import { width, height, center, armSize } from './constants';

interface Point {
  x: number;
  y: number;
}

const toRadian = (angle: number) => Math.PI / 180 * angle;

const getAngle = (A,B,C) => {
  var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
  var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
  var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));

  return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}

const Renderer = (ctx: CanvasRenderingContext2D) => {
  const renderAxis = (x: number, y: number, size = 25) => {
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

  const renderArm = (x = width / 4, y = height / 2) => {
    const from = {...center};
    const to = { x, y };
    const middle = {
      x: to.x + (from.x - to.x) / 2,
      y: to.y + (from.y - to.y) / 2,
    };

    const contact = to.x < from.x && to.y < from.y || to.x > from.x && to.y > from.y ? { x, y: from.y } : { x: from.x, y };

    const radian = (() => {
      if (to.x === from.x) {
        return toRadian(to.y > from.y ? 180 : 0);
      }

      if (to.y === from.y) {
        return toRadian(to.x > from.x ? 90 : 270);
      }

      return toRadian(to.x > from.x ? (to.y > from.y ? 90 : 0) : (to.y > from.y ? 180 : 270));
    })();

    const angle = to.x === from.x || to.y === from.y ? 0 : getAngle(to, from, contact);
    const distance = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
    const top = Math.sqrt(Math.pow(armSize.width, 2) - Math.pow(distance / 2, 2));

    const axisPoint = {
      x: Math.round(Math.cos(radian + angle) * top + middle.x),
      y: Math.round(Math.sin(radian + angle) * top + middle.y)
    }

    {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(contact.x, contact.y);
      ctx.moveTo(contact.x, contact.y);
      ctx.lineTo(to.x, to.y);
      ctx.moveTo(middle.x, middle.y);
      ctx.lineTo(axisPoint.x, axisPoint.y);
      ctx.stroke();
      ctx.closePath();
      
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(middle.x, middle.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.restore();
    }

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#b8c1c6';
    ctx.lineWidth = armSize.height;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(axisPoint.x, axisPoint.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  
    ctx.restore();

    renderAxis(axisPoint.x, axisPoint.y, 18);
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

  const render = (x?: number, y?: number) => {
    ctx.canvas.width = ctx.canvas.width;

    renderBorder();
    renderArm(x, y);
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