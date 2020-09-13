import * as PIXI from 'pixi.js';
import { resources, reelSettings } from '../settings';

export default class Reel extends PIXI.Container {
  public static getRandomTexture(): PIXI.Texture {
    if (Reel.slotTextures.length === 0) {
      resources.forEach((resource: string) => Reel.slotTextures.push(PIXI.Texture.from(resource)));
    }

    const randomSymbolNumber: number = Math.floor(
      Math.random() * Reel.slotTextures.length,
    );

    return Reel.slotTextures[randomSymbolNumber];
  }

  private static setSymbolParams(symbol: PIXI.Sprite): void {
    symbol.texture = Reel.getRandomTexture();

    const symbolScale: number = Math.min(
      reelSettings.symbolSize / (symbol.width / symbol.scale.x),
      reelSettings.symbolSize / (symbol.height / symbol.scale.y),
    );

    symbol.scale.y = symbolScale;
    symbol.scale.x = symbolScale;

    symbol.x = Math.round((reelSettings.symbolSize - symbol.width) / 2);
  }

  private static slotTextures: PIXI.Texture[] = [];

  public blur: PIXI.filters.BlurFilter = new PIXI.filters.BlurFilter();

  public index: number = 0;

  public previousIndex: number = 0;

  constructor(index: number) {
    super();

    this.x = index * reelSettings.width;
    this.blur.blurX = 0;
    this.blur.blurY = 0;
    this.filters = [this.blur];

    resources.forEach(() => {
      const symbol = new PIXI.Sprite();
      Reel.setSymbolParams(symbol);
      this.addChild(symbol);
    });
  }

  public update(): void {
    this.blur.blurY = (this.index - this.previousIndex) * reelSettings.blurMultiplier;
    this.previousIndex = this.index;

    this.children.forEach((item, index): void => {
      const symbol = item as PIXI.Sprite;

      symbol.y = ((this.index + index) % this.children.length)
          * reelSettings.symbolSize
        - reelSettings.symbolSize;

      if (symbol.y <= reelSettings.symbolSize || symbol.y >= 0) return;

      Reel.setSymbolParams(symbol);
    });
  }
}
