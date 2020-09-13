import * as PIXI from 'pixi.js';
import { stage } from '../settings';

export default class PixiFps extends PIXI.Container {
    private static readonly DEFAULT_FONT_SIZE: number = 26;

    private static readonly DEFAULT_FONT_COLOR: number = 0xff0000;

    private readonly fpsTextField: PIXI.Text;

    private fpsTicker: PIXI.Ticker;

    private readonly timeValues: number[];

    private lastTime: number;

    constructor(style?: PIXI.TextStyle) {
      super();

      const defaultStyle = new PIXI.TextStyle({
        fontSize: PixiFps.DEFAULT_FONT_SIZE,
        fill: PixiFps.DEFAULT_FONT_COLOR,
      });

      this.timeValues = [];
      this.lastTime = new Date().getTime();
      this.fpsTextField = new PIXI.Text('', { ...defaultStyle, ...style } as PIXI.TextStyle);
      this.y = stage.height - 30;

      this.fpsTicker = new PIXI.Ticker();
      this.fpsTicker.add(() => {
        this.measureFPS();
      });
      this.fpsTicker.start();

      this.addChild(this.fpsTextField);
    }

    set style(style: PIXI.TextStyle) {
      this.fpsTextField.style = style;
    }

    private measureFPS(): void {
      const currentTime = new Date().getTime();
      this.timeValues.push(1000 / (currentTime - this.lastTime));

      if (this.timeValues.length === 30) {
        let total = 0;
        for (let i = 0; i < 30; i++) {
          total += this.timeValues[i];
        }

        this.fpsTextField.text = (total / 30).toFixed(2);

        this.timeValues.length = 0;
      }

      this.lastTime = currentTime;
    }
}
