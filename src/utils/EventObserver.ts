type observerType = (date: object) => void;

export default class EventObserver {
    private observers: Array<observerType> = [];

    subscribe(fn: observerType) {
      this.observers.push(fn);
    }

    unsubscribe(fn: observerType) {
      this.observers = this.observers.filter((subscriber : observerType) => subscriber !== fn);
    }

    broadcast(data: object = {}) {
      this.observers.forEach((subscriber: observerType) => subscriber(data));
    }
}
