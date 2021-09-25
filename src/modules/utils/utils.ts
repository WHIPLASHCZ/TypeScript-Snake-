import type { snakeType, objType } from "./types";
import { direct } from "./types";
export enum moveKey {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

export let moveMap = (snake: snakeType): objType => {
  return {
    ArrowUp: direct.up,
    ArrowDown: direct.down,
    ArrowLeft: direct.left,
    ArrowRight: direct.right,
    Up: direct.up,
    Down: direct.down,
    Left: direct.left,
    Right: direct.right,
  };
};
