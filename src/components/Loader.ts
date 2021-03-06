import * as PIXI from 'pixi.js';
import Game from './Game';
import { stage, resources } from '../settings';
import { tickEvent } from '../events';

class Loader {
  private app: PIXI.Application;

  private game!: Game;

  private onReady: () => void = () => {};

  constructor() {
    this.app = new PIXI.Application(stage);

    const rootElement = document.getElementById('root');
    if (rootElement) rootElement.appendChild(this.app.view);

    resources.forEach((resource: string) => this.app.loader.add(resource));

    this.app.loader.load(() => {
      this.game = new Game();
      this.onReady();
    });
  }

  public start(): void {
    if (!this.game) {
      this.onReady = () => this.start();
      return;
    }

    this.app.stage.addChild(this.game);
    this.app.ticker.add(() => {
      tickEvent.broadcast({});
    });
  }
}

export default Loader;
