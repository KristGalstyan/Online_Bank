/**
 * StorageService is a class that provides an interface for working with localStorage
 * in a more convenient and structured way.
 */
export class StorageService {
  /**
   * Retrieves an item from localStorage by the provided key.
   *
   * @param {string} key - The key of the item to be retrieved.
   * @returns {any} The value of the item, or null if the item doesn't exist.
   */
  getItem(key) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  /**
   * Saves an item in localStorage with the provided key and value.
   *
   * @param {string} key - The key under which the value will be stored.
   * @param {any} value - The value to be stored.
   */
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * Removes an item from localStorage by the provided key.
   *
   * @param {string} key - The key of the item to be removed.
   */
  removeItem(key) {
    localStorage.removeItem(key)
  }

  /**
   * Clears all data from localStorage.
   */
  clear() {
    localStorage.clear()
  }
}
