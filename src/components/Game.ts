import * as PIXI from 'pixi.js';
import Reel from './Reel';
import { textStyle, stage, reelSettings } from '../settings';

export default class Game extends PIXI.Container {
  public static readonly defaultTextStyle: PIXI.TextStyle = new PIXI.TextStyle(
    textStyle,
  );

  private reelContainer!: PIXI.Container;

  private reelsRunning: boolean = false;

  private readonly margin: number = 0;

  constructor() {
    super();

    this.margin = (stage.height - reelSettings.symbolSize * 3) / 2;

    this.reelContainer = this.getReels();

    this.addChild(this.reelContainer, this.getTopPanel(), this.getBottomPanel());
  }

  private getReels = (): PIXI.Container => {
    const reelContainer = new PIXI.Container();
    reelContainer.y = this.margin;
    reelContainer.x = Math.round(stage.width - reelSettings.width * 5);

    for (let i = 0; i < reelSettings.totalCount; i += 1) {
      reelContainer.addChild(new Reel(i));
    }

    return reelContainer;
  };

  private getTopPanel = (): PIXI.Graphics => {
    const coverTop = new PIXI.Graphics();
    coverTop.beginFill(0, 1);
    coverTop.drawRect(0, 0, stage.width, this.margin);

    const textTop = new PIXI.Text('Octavian test task', Game.defaultTextStyle);
    textTop.x = Math.round((coverTop.width - textTop.width) / 2);
    textTop.y = Math.round((this.margin - textTop.height) / 2);

    coverTop.addChild(textTop);

    return coverTop;
  };

  private getBottomPanel = (): PIXI.Graphics => {
    const coverBottom = new PIXI.Graphics();
    coverBottom.beginFill(0, 1);
    coverBottom.drawRect(0, reelSettings.symbolSize * 3 + this.margin, stage.width, this.margin);

    const textBottom = new PIXI.Text('START', Game.defaultTextStyle);
    textBottom.x = Math.round((coverBottom.width - textBottom.width) / 2);
    textBottom.y = stage.height - this.margin + Math.round((this.margin - textBottom.height) / 2);

    coverBottom.interactive = true;
    coverBottom.buttonMode = true;
    coverBottom.addListener('pointerdown', () => this.startPlay());

    coverBottom.addChild(textBottom);

    return coverBottom;
  };

  public startPlay(): void {
    console.log('startPlay');
  }

  public update(): void {
    const reels = this.reelContainer.children;
    reels.map((item) => {
      const reel = item as Reel;
      reel.update();
      return null;
    });
  }
}
