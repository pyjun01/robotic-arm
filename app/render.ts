import { width, height, center, armSize, Point } from './constants';
import { getDistance, getRadian } from './lib';

const Renderer = (ctx: CanvasRenderingContext2D) => {
  const current = {
    x: width / 4,
    y: height / 2,
  };
  let v = {
    x: 0,
    y: 0,
  };
  let target = {
    x: width / 4,
    y: height / 2,
  };

  const renderArc = (pos: Point, size: number, style) => {
    ctx.beginPath();
    Object.assign(ctx, style);
    ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);

    if (style.fillStyle) {
      ctx.fill();
    }

    if (style.strokeStyle) {
      ctx.stroke();
    }
  }

  const renderAxis = (x: number, y: number, size = 25) => {
    renderArc({ x, y }, size, {
      fillStyle: '#b8c1c6'
    });

    renderArc({ x, y }, size * 0.6, {
      fillStyle: '#4c4648'
    });
  }
  
  const renderBorder = () => {
    renderArc(center, width / 2, {
      strokeStyle: '#333'
    });
  }

  const renderGuide = (contact: Point, axis: Point, middle: Point) => {
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(current.x, current.y);
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(contact.x, contact.y);
    ctx.moveTo(contact.x, contact.y);
    ctx.lineTo(current.x, current.y);
    ctx.moveTo(middle.x, middle.y);
    ctx.lineTo(axis.x, axis.y);
    ctx.stroke();
    
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(middle.x, middle.y, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  const renderArm = () => {
    const middle = {
      x: current.x + (center.x - current.x) / 2,
      y: current.y + (center.y - current.y) / 2,
    };
    const contact = 
      current.x < center.x && current.y < center.y ||
      current.x > center.x && current.y > center.y ?
      { x: current.x, y: center.y } :
      { x: center.x, y: current.y };
  
    const radian = getRadian(current, center, contact);
    const distance = getDistance(center, current);
    const top = Math.sqrt(Math.pow(armSize.width, 2) - Math.pow(distance / 2, 2));

    const axisPoint = {
      x: Math.round(Math.cos(radian) * top + middle.x),
      y: Math.round(Math.sin(radian) * top + middle.y)
    }

    renderGuide(contact, axisPoint, middle);

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#b8c1c6';
    ctx.lineWidth = armSize.height;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.moveTo(center.x, center.y);
    ctx.lineTo(axisPoint.x, axisPoint.y);
    ctx.lineTo(current.x, current.y);
    ctx.stroke();

    ctx.restore();

    renderAxis(axisPoint.x, axisPoint.y, 18);
  }

  const renderCenterAxis = () => {
    renderAxis(center.x, center.y);
  }

  const render = () => {
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    renderBorder();
    renderArm();
    renderCenterAxis();
  }

  const animate = () => {
    if (current.x !== target.x || current.y !== target.y) {
      const gap =  getDistance(current, target);

      if (gap < 10) {
        current.x = target.x;
        current.y = target.y;
      } else {
        current.x += v.x;
        current.y += v.y;
      }

      render();
    }

    requestAnimationFrame(animate);
  }

  const updateTarget = (point: Point) => {
    const distance = getDistance(current, point);

    v = {
      x: (point.x - current.x) / distance * 10,
      y: (point.y - current.y) / distance * 10,
    };

    target = {...point};
  }

  animate();

  return {
    render,
    updateTarget,
  };
}

export default Renderer;
