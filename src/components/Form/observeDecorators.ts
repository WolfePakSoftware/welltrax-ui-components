import * as mobx from 'mobx';

// MobX 6 decorators do nothing until makeObservable runs; MobX 5 has no makeObservable.
// Call it last in the constructor: tsc only puts fields on the instance once assigned.
export const observeDecorators = (target: object) =>
  (mobx as any).makeObservable?.(target);
