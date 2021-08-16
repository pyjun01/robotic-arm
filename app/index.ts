import { width, height, center } from './constants';
import { getDistance } from './lib';
import Renderer from './render';

(() => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const renderer = Renderer(ctx);

  const handleClick = (e: MouseEvent) => {
    const { x, y } = canvas.getBoundingClientRect();

    const pos = { x: e.pageX - x, y: e.pageY - y };
    const distance = getDistance(center, pos);

    if (distance > width / 2 || distance <= 30) {
      return;
    }

    renderer.updateTarget(pos);
  };

  const init = () => {
    canvas.width = width;
    canvas.height = height;

    canvas.addEventListener('click', handleClick);

    renderer.render();
  }

  init();
})();
