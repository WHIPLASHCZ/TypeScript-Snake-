import "./idx.less";
import GameControl from "./modules/gameControl";

window.onload = () => {
  let gameControl = new GameControl(
    "#snake",
    "#food",
    ".score",
    ".level",
    "#stop"
  );
  console.log(gameControl);
};
