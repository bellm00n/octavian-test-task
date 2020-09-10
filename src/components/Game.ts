import * as PIXI from 'pixi.js';
import config from '../config/index';

const { textStyles, reel, stage } = config;

export default class Game extends PIXI.Container {
  public static readonly defaultTextStyle: PIXI.TextStyle = new PIXI.TextStyle(
    textStyles.topText,
  );

  private reelContainer!: PIXI.Container;

  private reelsRunning: boolean = false;

  private margin: number;

  constructor() {
    super();

    this.margin = (stage.height - reel.symbolSize * 3) / 2;

    this.addChild(
      this.getReels(),
      this.getTopPanel(),
      this.getBottomPanel(),
    );
  }

  private getReels = (): PIXI.Container => {
    const reelContainer = new PIXI.Container();
    reelContainer.y = this.margin;
    reelContainer.x = Math.round(stage.width - reel.width * 5);

    // adding reels

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
    coverBottom.drawRect(0, reel.symbolSize * 3 + this.margin, stage.width, this.margin);

    const textBottom = new PIXI.Text('START', Game.defaultTextStyle);
    textBottom.x = Math.round((coverBottom.width - textBottom.width) / 2);
    textBottom.y = stage.height - this.margin + Math.round((this.margin - textBottom.height) / 2);

    coverBottom.interactive = true;
    coverBottom.buttonMode = true;
    coverBottom.addListener('pointerdown', () => this.startPlay());

    coverBottom.addChild(textBottom);

    return coverBottom;
  };

  public update(): void {

  }

  public startPlay(): void {
    console.log('startPlay');
  }
}
