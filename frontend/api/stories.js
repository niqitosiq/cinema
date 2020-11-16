import { ApiClass } from './ApiClass';

class Stories extends ApiClass {
  clips() {
    return this.get('clip');
  }
}

export { Stories };
