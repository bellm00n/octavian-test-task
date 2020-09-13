import * as PIXI from 'pixi.js';
import { reelSettings, stage } from '../settings';
import Reel from './Reel';

class ReelsContainer extends PIXI.Container {
  constructor() {
    super();

    this.y = reelSettings.margin;
    this.x = Math.round(stage.width - reelSettings.width * 5);

    for (let i = 0; i < reelSettings.totalCount; i += 1) {
      this.addChild(new Reel(i));
    }
  }
}

export default ReelsContainer;
