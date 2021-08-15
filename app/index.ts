import { width, height } from './constants';
import Renderer from './render';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;


const renderer = Renderer(ctx);



renderer.render();

canvas.onclick = e => {
  const { x } = canvas.getBoundingClientRect();

  console.log(e.pageX - x);
  renderer.render(e.pageX - x);
}