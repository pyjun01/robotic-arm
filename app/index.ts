import { width, height } from './constants';
import Renderer from './render';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;


const renderer = Renderer(ctx);

renderer.render(100, 250);

canvas.onclick = e => {
  const { x, y } = canvas.getBoundingClientRect();

  renderer.render(e.pageX - x, e.pageY - y);
}