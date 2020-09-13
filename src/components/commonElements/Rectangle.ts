import * as PIXI from 'pixi.js';

export interface RectangleParams {
  readonly height?: number;
  readonly width?: number;
  readonly color?: number;
  readonly x?: number;
  readonly y?: number;
  readonly alpha?: number;
  readonly interactive?: boolean;
  readonly buttonMode?: boolean;
  readonly clickHandler?: () => void;
}

export default class Rectangle extends PIXI.Graphics {
  constructor(params: RectangleParams) {
    super();

    this.draw(params);
  }

  private draw({
    color = 0x000000,
    alpha = 1,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    interactive = false,
    buttonMode = false,
    clickHandler = () => {},
  }: RectangleParams): void {
    this.beginFill(color, alpha);
    this.drawRect(x, y, width, height);

    this.interactive = interactive;
    this.buttonMode = buttonMode;

    this.addListener('pointerdown', clickHandler);
  }
}
