import fs from 'node:fs';
import nodePath from 'node:path';
import { isArray, parseFileMode } from './util.js';
import type {
  MakeDirectoryOptions,
  MakeDirectoryRecursiveOptions
} from './type.js';

function mkdirp(
  path: string,
  options?: string | number | MakeDirectoryRecursiveOptions
) {
  let mode = 0o777;
  if (typeof options === 'number' || typeof options === 'string') {
    mode = parseFileMode(options, 'mode');
  } else if (options?.mode) {
    mode = parseFileMode(options.mode, 'options.mode');
  }
  const sep = path.includes('/') ? '/' : nodePath.sep;
  const dirs = path.split(sep);
  let dirPath = '';
  const result: string[] = [];
  for (const dir of dirs) {
    dirPath += `${dir}${sep}`;
    mkdir(dirPath, mode);
  }
  function mkdir(path: string, mode: MakeDirectoryOptions['mode']) {
    if (!fs.existsSync(dirPath)) {
      try {
        fs.mkdirSync(path, mode);
        result.push(path);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    return undefined;
  }
  return result.length ? nodePath.resolve(result[0]) : undefined;
}

export function mkdirSyncRecursive(
  path: string | string[],
  options?: string | number | MakeDirectoryRecursiveOptions
) {
  let mpath: string | (string | undefined)[] | undefined;
  if (typeof path === 'string') {
    mpath = mkdirp(path, options);
  } else {
    mpath = [];
    for (const p of path) {
      mpath.push(mkdirp(p, options));
    }
  }
  return isArray(mpath) ? (mpath.some((m) => !!m) ? mpath : undefined) : mpath;
}
