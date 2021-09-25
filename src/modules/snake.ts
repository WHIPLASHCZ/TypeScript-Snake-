import { GAME_BOX_MAXWIDTH, GAME_BOX_MAXHEIGHT } from "./utils/INFO";
import { direct } from "./utils/types";
import { moveKey } from "./utils/utils";
interface SnakeType {
  el: HTMLElement;
  width: number;
  height: number;
  step: number;
}
class Snake implements SnakeType {
  el: HTMLElement;
  head: HTMLElement;
  bodies: HTMLCollection;
  width: number;
  height: number;
  private left: number;
  private top: number;
  step: number;
  leftWall: number;
  rigthWall: number;
  topWall: number;
  botWall: number;
  stepMap: { [index: string]: number };
  constructor(elSelector: string) {
    this.el = document.querySelector(elSelector)!;
    this.bodies = this.el.getElementsByTagName("div")!;
    this.head = this.bodies[0] as HTMLElement;
    this.width = this.head.offsetWidth;
    this.height = this.head.offsetHeight;
    this.left = this.head.offsetLeft;
    this.top = this.head.offsetTop;
    this.leftWall = 0;
    this.rigthWall = GAME_BOX_MAXWIDTH;
    this.topWall = 0;
    this.botWall = GAME_BOX_MAXHEIGHT;
    this.step = 10;
    this.stepMap = {
      left: -this.step,
      right: this.step,
      up: -this.step,
      down: this.step,
    };
  }
  get X() {
    return this.left;
  }
  get Y() {
    return this.top;
  }
  //   一节一节往前移动 从最后一节开始
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = x + "px";
      (this.bodies[i] as HTMLElement).style.top = y + "px";
    }
  }
  move(dir: direct, lastDir: direct) {
    let step = this.stepMap[dir];

    this.moveBody();
    if (dir == direct.down || dir == direct.up) {
      this.top += step;
      this.head.style.top = `${this.top}px`;
    } else if (dir == direct.left || dir == direct.right) {
      this.left += step;
      this.head.style.left = `${this.left}px`;
    }
  }
  checkBodyHit() {
    for (let i = 4; i < this.bodies.length; i++) {
      if (
        (this.bodies[i] as HTMLElement).offsetLeft == this.head.offsetLeft &&
        (this.bodies[i] as HTMLElement).offsetTop == this.head.offsetTop
      ) {
        throw new Error("蛇撞到了自己！");
      }
    }
  }
  grow() {
    let newBody = '<div class="body"></div>';
    this.el.insertAdjacentHTML("beforeend", newBody);
    this.bodies = this.el.getElementsByTagName("div")!;
    this.width = this.el.offsetWidth;
    this.height = this.el.offsetHeight;
  }
  overTheWall() {
    if (
      this.X < this.leftWall ||
      this.X + this.width > this.rigthWall ||
      this.Y < this.topWall ||
      this.Y + this.height > this.botWall
    ) {
      throw new Error("蛇撞墙了！");
    }
  }
  reset() {
    this.top = 0;
    this.left = 0;
    this.el.innerHTML = '<div class="head"></div>';
    this.bodies = this.el.getElementsByTagName("div")!;
    this.head = this.bodies[0] as HTMLElement;
    this.head.style.left = `${this.left}px`;
    this.head.style.top = `${this.top}px`;
    this.width = this.head.offsetWidth;
    this.height = this.head.offsetHeight;
  }
}
export default Snake;
