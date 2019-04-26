// import { ID } from '@vendure/common/lib/shared-types';
import * as _ from 'lodash';

/**
 * Takes a predicate function and returns a negated version.
 */
export function not(predicate: (...args: any[]) => boolean) {
  return (...args: any[]) => !predicate(...args);
}

/**
 * Returns a predicate function which returns true if the item is found in the set,
 * as determined by a === equality check on the given compareBy property.
 */
export function foundIn<T>(set: T[], compareBy: keyof T) {
  return (item: T) => set.some(t => t[compareBy] === item[compareBy]);
}

/**
 * Indentity function which asserts to the type system that a promise which can resolve to T or undefined
 * does in fact resolve to T.
 * Used when performing a "find" operation on an entity which we are sure exists, as in the case that we
 * just successfully created or updated it.
 */
export function assertFound<T>(promise: Promise<T | undefined>): Promise<T> {
  return promise as Promise<T>;
}

/**
 * Compare ID values for equality, taking into account the fact that they may not be of matching types
 * (string or number).
 */
// export function idsAreEqual(id1?: ID, id2?: ID): boolean {
//   if (id1 === undefined || id2 === undefined) {
//     return false;
//   }
//   return id1.toString() === id2.toString();
// }

/**
 * Returns the AssetType based on the mime type.
 */
// export function getAssetType(mimeType: string): AssetType {
//     const type = mimeType.split('/')[0];
//     switch (type) {
//         case 'image':
//             return AssetType.IMAGE;
//         case 'video':
//             return AssetType.VIDEO;
//         default:
//             return AssetType.BINARY;
//     }
// }

/**
 * A simple normalization for email addresses. Lowercases the whole address,
 * even though technically the local part (before the '@') is case-sensitive
 * per the spec. In practice, however, it seems safe to treat emails as
 * case-insensitive to allow for users who might vary the usage of
 * upper/lower case. See more discussion here: https://ux.stackexchange.com/a/16849
 */
export function normalizeEmailAddress(input: string): string {
  return input.trim().toLowerCase();
}

/**
 * Format and transform meta list to meta Object
 * @param list
 */
export function formatAllMeta(list: any[]) {
  const items = [];
  for (let item of list) {
    item.meta = {};
    if (_.has(item, 'metas') && item.metas.length > 0) {
      for (const meta of item.metas) {
        if (meta.key.includes('_capabilities')) {
          item = Object.assign(item, meta.value);
        }
        if (meta.key.includes('_wechat')) {
          const wechat = meta.value;
          item = Object.assign(item, {
            avatarUrl: wechat.avatarUrl,
          });
        }
        item.meta[meta.key] = meta.value;
      }
    }
    Reflect.deleteProperty(item, 'metas');
    items.push(item);
  }
  return items;
}

//
// Private methods
//
/**
 * 格式化单个对象的元数据信息
 * @param item
 */
export function formatOneMeta(item: any) {
  item.meta = {};
  if (!_.isEmpty(item.metas) && item.metas.length > 0) {
    for (const meta of item.metas) {
      if (meta.key.includes('_liked_posts')) {
        item.liked = meta.value;
      }
      item.meta[meta.key] = meta.value;
    }
  }
  Reflect.deleteProperty(item, 'metas');
  return item;
}