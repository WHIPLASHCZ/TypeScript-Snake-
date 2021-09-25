class ScorePanel {
  scorePanel: HTMLElement;
  levelPanel: HTMLElement;
  score: number;
  level: number;
  maxScore: number;
  maxLevel: number;
  EXP: number;
  constructor(
    scoreSelector: string,
    levelSelector: string,
    maxScore: number = 10,
    maxLevel: number = 10,
    EXP: number = 3
  ) {
    this.scorePanel = document.querySelector(scoreSelector)!;
    this.levelPanel = document.querySelector(levelSelector)!;
    this.score = 0;
    this.level = 1;
    this.maxScore = maxScore;
    this.maxLevel = maxLevel;
    this.EXP = EXP;
    this.init();
  }
  init() {
    this.setLevel(1);
    this.setScore(0);
  }
  setLevel(newLevel: number = 1) {
    this.level = newLevel;
    this.levelPanel.innerHTML = `${newLevel}`;
  }
  setScore(newScore: number = 0) {
    this.score = newScore;
    this.scorePanel.innerHTML = this.score.toString();
    if (this.score && this.score % this.EXP == 0) {
      this.levelUp();
    }
  }
  isWon() {
    if (this.level == this.maxLevel) {
      alert("你赢了！");
      window.location.href = "https://github.com/WHIPLASHCZ";
      return true;
    }
  }
  addScore() {
    if (this.score > this.maxScore) return;
    this.score++;
    this.scorePanel.innerHTML = this.score.toString();
    if (this.score && this.score % this.EXP == 0) {
      this.levelUp();
    }
  }
  levelUp() {
    if (this.level >= this.maxLevel) return;
    this.level++;
    this.levelPanel.innerHTML = this.level.toString();
  }
}

export default ScorePanel;
