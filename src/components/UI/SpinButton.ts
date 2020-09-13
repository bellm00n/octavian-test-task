import * as PIXI from 'pixi.js';
import { tickEvent, spinStartEvent } from '../../events';
import { defaultTextStyle, stage, reelSettings } from '../../settings';

class SpinButton extends PIXI.Container {
  private textBottom!: PIXI.Text;

  private textBottomAnimationPhase: 1 | 2 = 1;

  constructor() {
    super();

    this.setButtonText();
    this.setContainerParams();
    tickEvent.subscribe(this.animateSpinButton);
  }

  private setContainerParams = (): void => {
    this.interactive = true;
    this.buttonMode = true;
    this.addListener('pointerdown', () => spinStartEvent.broadcast({}));

    this.x = Math.round((stage.width - this.width) / 2);
    this.y = stage.height
        - reelSettings.margin
        + Math.round((reelSettings.margin - this.textBottom.height) / 2);
  };

  private setButtonText = (): void => {
    const style = new PIXI.TextStyle(defaultTextStyle);
    this.textBottom = new PIXI.Text('START', style);
    this.addChild(this.textBottom);
  };

  private animateSpinButton = (): void => {
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
}

export default SpinButton;
