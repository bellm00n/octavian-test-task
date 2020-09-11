import { lerp } from '../utils';

export default class Tween {
  public static tweening: Tween[] = [];

  public propertyBeginValue: any;

  public start: number = Date.now();

  constructor(
    public object: any,
    public property: string,
    public target: number,
    public time: number,
    public easing: (t: number) => number,
    public change: (tween: Tween) => void | null,
    public complete: (tween: Tween) => void | null,
  ) {
    this.propertyBeginValue = object[property];
  }

  public static update(): void {
    const now = Date.now();
    const remove: Tween[] = [];

    Tween.tweening.map((tween: Tween): null => {
      const phase = Math.min(1, (now - tween.start) / tween.time);

      tween.object[tween.property] = lerp(
        tween.propertyBeginValue,
        tween.target,
        tween.easing(phase),
      );
      if (tween.change) {
        tween.change(tween);
      }
      if (phase === 1) {
        tween.object[tween.property] = tween.target;
        if (tween.complete) {
          tween.complete(tween);
        }
        remove.push(tween);
      }

      return null;
    });

    remove.map((_, index: number) => {
      Tween.tweening.splice(Tween.tweening.indexOf(remove[index]), 1);
    });
  }
}
