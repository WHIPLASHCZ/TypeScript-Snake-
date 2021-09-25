// 食物类
import { GAME_BOX_MAXWIDTH, GAME_BOX_MAXHEIGHT } from "./utils/INFO";
class Food {
  el: HTMLElement;
  width: number;
  height: number;
  constructor(selector: string) {
    this.el = document.querySelector(selector)!;
    this.width = this.el.offsetWidth;
    this.height = this.el.offsetHeight;
  }
  get X() {
    return this.el.offsetLeft;
  }
  get Y() {
    return this.el.offsetTop;
  }
  getRandomPosition(max: number, selfNum: number) {
    let maxnum = max - selfNum;
    let numm = Math.round(Math.random() * (maxnum / 10)) * 10;
    return numm;
  }
  //   食物坐标必须是10的倍数 因为蛇移动单位是10
  formatNum(num: number) {
    if (num < 10) return 0;
    else if (num % 10 == 0) return num;
    let str = num.toString();
    let litle = str[str.length - 1];
    let res = num - Number(litle);
    return res;
  }
  rePlace() {
    let randomX = this.getRandomPosition(GAME_BOX_MAXWIDTH, this.width);
    let randomY = this.getRandomPosition(GAME_BOX_MAXHEIGHT, this.height);
    this.el.style.left = `${randomX}px`;
    this.el.style.top = `${randomY}px`;
  }
}

export default Food;
