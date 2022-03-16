import NodeCache from 'node-cache';

const myCache = new NodeCache({ stdTTL: 172800, checkperiod: 43200 });

/**
 * @description This class is the cache helpers
 */
class CacheHelpers {
  /**
   * @description method that get from cache
   * @param {Object} cacheName the cache key
   * @param {Object} data the data to be save
   * @param {Object} expirytime the expiry time
   * @returns {Object} boolean
   */
  static async saveToCache(cacheName, data, expirytime) {
    return myCache.set(cacheName, data, expirytime);
  }

  /**
   * @description method that get from cache
   * @param {Object} cacheName the response code
   * @returns {Object} the data that was gotten
   */
  static async getCache(cacheName) {
    try {
      return myCache.get(cacheName);
    } catch (e) {
      return false;
    }
  }

  /**
   * @description method that check if data exist in cache array
   * @param {Object} cacheName the response code
   * @param {Object} dataToFind the response code
   * @returns {Object} booloan or data gotten
   */
  static async findFromCache(cacheName, dataToFind) {
    try {
      const getData = await CacheHelpers.getCache(cacheName);

      if (!getData) {
        return false;
      }

      return getData[dataToFind] || false;
    } catch (e) {
      return false;
    }
  }
}

export default CacheHelpers;
