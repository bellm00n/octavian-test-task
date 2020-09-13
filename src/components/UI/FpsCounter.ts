import * as PIXI from 'pixi.js';
import { stage, fpsTextStyle } from '../../settings';

export default class PixiFps extends PIXI.Container {
    private readonly fpsTextField: PIXI.Text;

    private fpsTicker: PIXI.Ticker;

    private readonly timeValues: number[];

    private lastTime: number;

    constructor() {
      super();

      const defaultStyle = new PIXI.TextStyle(fpsTextStyle);

      this.timeValues = [];
      this.lastTime = new Date().getTime();
      this.fpsTextField = new PIXI.Text('', defaultStyle);
      this.y = stage.height - 30;

      this.fpsTicker = new PIXI.Ticker();
      this.fpsTicker.add(() => {
        this.measureFPS();
      });
      this.fpsTicker.start();

      this.addChild(this.fpsTextField);
    }

    private measureFPS(): void {
      const currentTime = new Date().getTime();
      this.timeValues.push(1000 / (currentTime - this.lastTime));

      if (this.timeValues.length === 30) {
        let total = 0;
        for (let i = 0; i < 30; i += 1) {
          total += this.timeValues[i];
        }

        this.fpsTextField.text = (total / 30).toFixed(2);

        this.timeValues.length = 0;
      }

      this.lastTime = currentTime;
    }
}
