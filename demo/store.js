import {
  observable,
  decorate,
  computed,
  autorun,
  action,
  toJS
} from "../../web_modules/mobx.js";

class Store {
  constructor() {
    this.name = null;
    this.state = 'creating-store';
  }
}

decorate(Store, {
  name: observable,
  state: observable
});

export const store = new Store()