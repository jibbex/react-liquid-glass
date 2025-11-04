import fs from 'fs/promises';
import path from 'path';

const TARGET_DIR = process.argv[2];
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

/**
 * Recursively removes a directory and all its contents.
 * 
 * @async
 * @function rmDirRecursive
 * @param {string} dirPath - The path to the directory to be removed
 * @returns {Promise<void>} A promise that resolves when the directory and all its contents have been removed
 * @throws {Error} Throws an error if the directory doesn't exist or if there are permission issues
 * 
 * @example
 * // Remove a directory and all its contents
 * await rmDirRecursive('./temp-folder');
 */
async function rmDirRecursive(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
    await Promise.all(entries.map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      return entry.isDirectory() ? rmDirRecursive(fullPath) : fs.unlink(fullPath);
    }));
    await fs.rmdir(dirPath);
}

if (!TARGET_DIR) {
  console.error('Please provide a directory path to remove.');
  process.exit(1);
}

rmDirRecursive(TARGET_DIR).then(() => {
  console.log(`${GREEN}Successfully removed directory: ${TARGET_DIR}${RESET}`);
}).catch((error) => {
  console.error(`${RED}Failed to remove directory ${TARGET_DIR}:${RESET}`, error);
});