const { Set } = window;

export default class Logger {
  constructor() {
    this._subscribers = new Set();
    this._messages = [];
  }

  getMessages = () => this._messages;

  subscribe = subscriber => {
    this._subscribers.add(subscriber);
    return () => this._subscribers.delete(subscriber);
  };

  log = message => {
    window.console.log("MESSAGE", message);
    this._messages.push(message);
    this._subscribers.forEach(s => s());
  };

  clear = () => {
    this._messages.length = 0;
    this._subscribers.forEach(s => s());
  };
}
