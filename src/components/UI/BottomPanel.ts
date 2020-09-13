import * as PIXI from 'pixi.js';
import { Rectangle } from '../commonElements';
import { reelSettings, stage } from '../../settings';
import SpinButton from './SpinButton';

class BottomPanel extends PIXI.Container {
  constructor() {
    super();

    this.draw();
  }

    private draw = ():void => {
      const coverBottom = new Rectangle({
        y: reelSettings.symbolSize * 3 + reelSettings.margin,
        width: stage.width,
        height: reelSettings.margin,
      });

      const spinButton = new SpinButton();

      coverBottom.addChild(spinButton);
      this.addChild(coverBottom);
    }
}

export default BottomPanel;
