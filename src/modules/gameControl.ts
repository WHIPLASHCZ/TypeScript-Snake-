import Food from "./food";
import ScorePanel from "./scorePanel";
import Snake from "./snake";

import { snakeType, foodType, panelType, objType, direct } from "./utils/types";
import { moveKey, moveMap } from "./utils/utils";
import { GAME_BOX_MAXWIDTH, GAME_BOX_MAXHEIGHT } from "./utils/INFO";
class GameControl {
  snake: snakeType;
  food: foodType;
  panel: panelType;
  moveMap: objType;
  snakeLong: number;
  direct: moveKey | null;
  timer: NodeJS.Timer | null;
  stopBtn: HTMLElement;
  snakeHeigth: number;
  delay: number;
  alive: boolean;
  lastDir: moveKey | null;
  constructor(
    snakeSelector: string,
    foodSelector: string,
    scoreSelector: string,
    levelSelector: string,
    stopSelector: string,
    maxScore: number = 18,
    maxLevel: number = 6
  ) {
    this.snake = new Snake(snakeSelector);
    this.snakeLong = this.snake.width;
    this.snakeHeigth = this.snake.height;
    this.food = new Food(foodSelector);
    this.stopBtn = document.querySelector(stopSelector)!;
    this.alive = true;
    this.panel = new ScorePanel(
      scoreSelector,
      levelSelector,
      maxScore,
      maxLevel
    );
    this.moveMap = moveMap(this.snake);
    this.direct = moveKey.Right;
    this.lastDir = null;
    this.timer = null;
    this.delay = 200;
    this.init();
  }

  init() {
    window.addEventListener("keyup", this.changeDir.bind(this));
    this.stopBtn.addEventListener("click", this.stop.bind(this));
    this.move();
  }
  changeDir(e: KeyboardEvent) {
    if (e.key == this.direct) return;
    if (moveKey[e.key as moveKey]) {
      if (this.isTurning(e.key)) return;
      this.lastDir = this.direct;
      this.direct = e.key as moveKey;
      console.log(this.direct, this.lastDir);
    }
  }
  isTurning(newDir: string) {
    if (
      (this.moveMap[newDir] == direct.down &&
        this.moveMap[this.direct!] == direct.up) ||
      (this.moveMap[newDir] == direct.up &&
        this.moveMap[this.direct!] == direct.down)
    ) {
      return true;
    } else if (
      (this.moveMap[newDir] == direct.left &&
        this.moveMap[this.direct!] == direct.right) ||
      (this.moveMap[newDir] == direct.right &&
        this.moveMap[this.direct!] == direct.left)
    ) {
      return true;
    } else {
      return false;
    }
  }
  move() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.alive) {
        this.snake.move(
          this.moveMap[this.direct as moveKey],
          this.moveMap[this.lastDir as moveKey]
        );
        try {
          this.snake.overTheWall();
          this.snake.checkBodyHit();
        } catch (e: any) {
          alert(e.message + "GAME OVER!");
          this.lose();
        }
        if (
          (this.snake.X == this.food.X ||
            this.snake.X + this.snakeLong == this.food.X) &&
          (this.snake.Y == this.food.Y ||
            this.snake.Y - this.snakeHeigth == this.food.Y)
        ) {
          this.eat();
        }
      }
    }, this.delay);
  }
  eat() {
    this.snake.grow();
    this.snakeLong = this.snake.width;
    this.snakeHeigth = this.snake.height;
    this.panel.addScore();
    if (this.panel.isWon()) this.lose();
    this.food.rePlace();
    this.delay = this.delay - 20 < 60 ? 60 : this.delay - 20;
    this.move();
  }
  stop() {
    if (this.timer) {
      this.alive = false;
      clearInterval(this.timer);
      this.timer = null;
      this.stopBtn.innerHTML = "开始";
    } else {
      this.move();
      this.stopBtn.innerHTML = "暂停";
      this.alive = true;
    }
  }
  lose() {
    this.alive = false;
    this.reset();
  }
  reset() {
    this.direct = moveKey.Right;
    this.delay = 220;
    this.snake.reset();
    this.food.rePlace();
    this.panel.setScore();
    this.panel.setLevel();
    this.alive = true;
    this.stop();
  }
}

export default GameControl;
