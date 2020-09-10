import * as PIXI from 'pixi.js';
import config from '../config/index';
import Game from './Game';

class Loader {
  private app: PIXI.Application;

  private game!: Game;

  private onReady: () => void = () => {};

  constructor() {
    const { stage, resources } = config;

    this.app = new PIXI.Application(stage);

    document.body.appendChild(this.app.view);

    resources.map((resource) => this.app.loader.add(resource));

    this.app.loader.load(() => {
      this.game = new Game();
      this.onReady();
    });
  }

  public start(): void {
    if (!this.game) {
      this.onReady = () => this.start();
    }
    
    this.app.stage.addChild(this.game);
    this.app.ticker.add(() => {
      this.game.update();
    });
  }
}

export default Loader;
