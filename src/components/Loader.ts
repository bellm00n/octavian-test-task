import * as PIXI from "pixi.js";
import Game from "./Game";
import { stage, resources } from "../settings";

class Loader {
  private app: PIXI.Application;

  private game!: Game;

  private onReady: () => void = () => {};

  constructor() {
    this.app = new PIXI.Application(stage);
    document.body.appendChild(this.app.view);

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
      this.game.update();
    });
  }
}

export default Loader;
