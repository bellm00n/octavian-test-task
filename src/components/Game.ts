import * as PIXI from 'pixi.js';
import Tween from './Tween';
import Reel from './Reel';
import { backout } from '../utils/easingFunctions';
import { tickEvent, spinStartEvent } from '../events';
import { TopPanel, BottomPanel, FpsCounter } from './UI';
import ReelsContainer from "./ReelsContainer"

export default class Game extends PIXI.Container {
  private readonly reelContainer!: PIXI.Container;

  private reelsRunning: boolean = false;

  constructor() {
    super();

    this.reelContainer = new ReelsContainer();

    const fpsCounter = new FpsCounter();
    const topPanel = new TopPanel();
    const bottomPanel = new BottomPanel();

    this.addChild(
      this.reelContainer,
      topPanel,
      bottomPanel,
      fpsCounter,
    );

    this.addListeners();
  }

  private addListeners = (): void => {
    tickEvent.subscribe(this.update);
    spinStartEvent.subscribe(this.startPlay);
  }

  private startPlay = (): void => {
    if (this.reelsRunning) {
      return;
    }

    this.reelsRunning = true;

    const reels = this.reelContainer.children;
    reels.forEach((item, index) => {
      const reel = item as Reel;

      const extra = Math.floor(Math.random() * 3);
      const target = reel.index + 10 + index * 5 + extra;
      const time = 2500 + index * 600 + extra * 600;

      const tween = new Tween(
        reel,
        'index',
        target,
        time,
        backout(0.5),
        null,
        index === reels.length - 1
          ? () => {
            this.reelsRunning = false;
          }
          : null,
      );
      Tween.tweening.push(tween);
    });
  };

  public update = (): void => {
    const reels = this.reelContainer.children;
    reels.forEach((item) => {
      const reel = item as Reel;
      reel.update();
    });

    Tween.update();
  }
}
