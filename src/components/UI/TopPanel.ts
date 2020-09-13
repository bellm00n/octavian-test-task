import * as PIXI from 'pixi.js';
import Rectangle from '../commonElements/Rectangle';
import { reelSettings, stage, textStyle } from '../../settings';

class TopPanel extends PIXI.Container {
  constructor() {
    super();

    this.draw();
  }

  private draw = (): void => {
    const coverTop = new Rectangle({
      width: stage.width,
      height: reelSettings.margin,
    });
    const style = new PIXI.TextStyle(textStyle);
    const textTop = new PIXI.Text('Octavian test task', style);
    textTop.x = Math.round((coverTop.width - textTop.width) / 2);
    textTop.y = Math.round((reelSettings.margin - textTop.height) / 2);

    coverTop.addChild(textTop);
    this.addChild(coverTop);
  };
}

export default TopPanel;
