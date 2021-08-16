import { Point } from './constants';

export const getDistance = (pos1: Point, pos2: Point) => Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));

export const toRadian = (angle: number) => Math.PI / 180 * angle;

export const getAngle = (pos1: Point, pos2: Point, pos3: Point) => {
  const AB = getDistance(pos2, pos1);
  const BC = getDistance(pos2, pos3);
  const AC = getDistance(pos3, pos1);

  return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
}

export const getRadian = (pos1: Point, pos2: Point, pos3: Point) => {
  const correction = (() => {
    if (pos1.x === pos2.x) {
      return toRadian(pos1.y > pos2.y ? 180 : 0);
    }

    if (pos1.y === pos2.y) {
      return toRadian(pos1.x > pos2.x ? 90 : 270);
    }

    return toRadian(pos1.x > pos2.x ? (pos1.y > pos2.y ? 90 : 0) : (pos1.y > pos2.y ? 180 : 270));
  })();

  const angle = pos1.x === pos2.x || pos1.y === pos2.y ? 0 : getAngle(pos1, pos2, pos3);

  return correction + angle;
}
