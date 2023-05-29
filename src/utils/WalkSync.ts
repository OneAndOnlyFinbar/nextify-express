import * as fs from 'fs';

export const walkSync = (dir: string) => {
  return fs.readdirSync(dir).reduce((files: Array<string>, file: string) => {
    const name = `${dir}/${file}`;
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...walkSync(name)] : [...files, name];
  }, []);
}