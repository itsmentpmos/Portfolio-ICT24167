/**
 * storage.js
 * IndexedDB + LocalStorage storage manager for SPU ICT Web Portfolio.
 * Allows storing large image uploads and PDF files reliably in the browser.
 */

const SPU_DB_NAME = 'SPUPortfolioDB';
const SPU_DB_VERSION = 1;
const SPU_STORE_FILES = 'portfolio_files';

class StorageManager {
  constructor() {
    this.db = null;
    this.initPromise = this.initDB();
  }

  initDB() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, falling back to memory/localStorage');
        resolve(false);
        return;
      }
      const request = indexedDB.open(SPU_DB_NAME, SPU_DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(SPU_STORE_FILES)) {
          db.createObjectStore(SPU_STORE_FILES, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(true);
      };

      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
        resolve(false);
      };
    });
  }

  // Save a file (Base64/Blob) to IndexedDB
  async saveFile(id, fileData, mimeType = '', fileName = '') {
    await this.initPromise;
    if (!this.db) {
      try {
        localStorage.setItem(`spu_file_${id}`, JSON.stringify({ id, fileData, mimeType, fileName }));
        return true;
      } catch (e) {
        console.error('LocalStorage quota exceeded:', e);
        return false;
      }
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = this.db.transaction(SPU_STORE_FILES, 'readwrite');
        const store = tx.objectStore(SPU_STORE_FILES);
        store.put({
          id,
          fileData,
          mimeType,
          fileName,
          updatedAt: new Date().toISOString()
        });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      } catch (err) {
        console.error('Error saving file in IndexedDB:', err);
        resolve(false);
      }
    });
  }

  // Retrieve a file by ID
  async getFile(id) {
    await this.initPromise;
    if (!this.db) {
      const local = localStorage.getItem(`spu_file_${id}`);
      return local ? JSON.parse(local) : null;
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(SPU_STORE_FILES, 'readonly');
        const store = tx.objectStore(SPU_STORE_FILES);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (e) {
        console.error('Error reading file from IndexedDB:', e);
        resolve(null);
      }
    });
  }

  // Delete a file by ID
  async deleteFile(id) {
    await this.initPromise;
    if (!this.db) {
      localStorage.removeItem(`spu_file_${id}`);
      return true;
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(SPU_STORE_FILES, 'readwrite');
        const store = tx.objectStore(SPU_STORE_FILES);
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  }

  // LocalStorage JSON helpers
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
      return defaultValue;
    }
  }

  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing ${key} to localStorage`, e);
      return false;
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }
}

window.spuStorage = new StorageManager();
