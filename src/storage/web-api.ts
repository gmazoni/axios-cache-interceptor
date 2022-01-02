import { buildStorage } from './build';

/**
 * @example
 * ```js
 * const fromLocalStorage = buildWebStorage(localStorage);
 *
 * const fromSessionStorage = buildWebStorage(sessionStorage);
 *
 * const myStorage = new Storage();
 * const fromMyStorage = buildWebStorage(myStorage);
 * ```
 */
export function buildWebStorage(storage: Storage, prefix = '') {
  return buildStorage({
    find: (key: string) => {
      const json = storage.getItem(prefix + key);
      return Promise.resolve(json ? JSON.parse(json) : undefined);
    },

    set: (key: string, value: any) =>
      Promise.resolve(void storage.setItem(prefix + key, JSON.stringify(value))),

    remove: (key: string) => Promise.resolve(void storage.removeItem(prefix + key))
  });
}
