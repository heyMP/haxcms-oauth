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
    this.createContainer = {
      state: 'default'
    }
  }
}

decorate(Store, {
  name: observable,
  createContainer: observable
});

export const store = new Store()