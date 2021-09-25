import Food from "../food";
import ScorePanel from "../scorePanel";
import Snake from "../snake";

export type snakeType = InstanceType<typeof Snake>;
export type foodType = InstanceType<typeof Food>;
export type panelType = InstanceType<typeof ScorePanel>;
export interface objType {
  [index: string]: any;
}
export enum direct {
  left = "left",
  right = "right",
  up = "up",
  down = "down",
}
