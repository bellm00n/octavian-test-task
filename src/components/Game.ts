import * as PIXI from 'pixi.js';
import Tween from './Tween';
import Reel from './Reel';
import FpsCounter from './UI/FpsCounter';
import { textStyle, stage, reelSettings } from '../settings';
import { backout } from '../utils/easingFunctions';
import Rectangle from './commonElements/Rectangle';

export default class Game extends PIXI.Container {
  public static readonly defaultTextStyle: PIXI.TextStyle = new PIXI.TextStyle(
    textStyle,
  );

  private readonly reelContainer!: PIXI.Container;

  private textBottom!: PIXI.Text;

  private textBottomAnimationPhase: 1 | 2 = 1;

  private reelsRunning: boolean = false;

  constructor() {
    super();

    this.reelContainer = this.getReels();

    const fpsCounter = new FpsCounter();

    this.addChild(
      this.reelContainer,
      this.getTopPanel(),
      this.getBottomPanel(),
      fpsCounter,
    );
  }

  private getReels = (): PIXI.Container => {
    const reelContainer = new PIXI.Container();
    reelContainer.y = reelSettings.margin;
    reelContainer.x = Math.round(stage.width - reelSettings.width * 5);

    for (let i = 0; i < reelSettings.totalCount; i += 1) {
      reelContainer.addChild(new Reel(i));
    }

    return reelContainer;
  };

  private getTopPanel = (): PIXI.Graphics => {
    const coverTop = new Rectangle({ width: stage.width, height: reelSettings.margin });

    const textTop = new PIXI.Text('Octavian test task', Game.defaultTextStyle);
    textTop.x = Math.round((coverTop.width - textTop.width) / 2);
    textTop.y = Math.round((reelSettings.margin - textTop.height) / 2);

    coverTop.addChild(textTop);

    return coverTop;
  };

  private getBottomPanel = (): PIXI.Graphics => {
    const coverBottom = new Rectangle({
      y: reelSettings.symbolSize * 3 + reelSettings.margin,
      width: stage.width,
      height: reelSettings.margin,
      interactive: true,
      buttonMode: true,
      clickHandler: this.startPlay,
    });

    this.textBottom = new PIXI.Text('START', Game.defaultTextStyle);
    this.textBottom.x = Math.round((coverBottom.width - this.textBottom.width) / 2);
    this.textBottom.y = stage.height
      - reelSettings.margin
      + Math.round((reelSettings.margin - this.textBottom.height) / 2);

    coverBottom.addChild(this.textBottom);

    return coverBottom;
  };

  private changeBottomTextAlpha = (): void => {
    if (this.textBottomAnimationPhase === 1) {
      this.textBottom.alpha -= 0.015;
    } else {
      this.textBottom.alpha += 0.015;
    }

    if (this.textBottom.alpha < 0.5) {
      this.textBottomAnimationPhase = 2;
    }

    if (this.textBottom.alpha >= 1) {
      this.textBottomAnimationPhase = 1;
    }
  };

  public startPlay = (): void => {
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

  public update(): void {
    this.changeBottomTextAlpha();
    const reels = this.reelContainer.children;
    reels.forEach((item) => {
      const reel = item as Reel;
      reel.update();
    });

    Tween.update();
  }
}
