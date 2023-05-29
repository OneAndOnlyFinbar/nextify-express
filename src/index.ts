import { type Application } from 'express';
import * as fs from 'fs';

const walkSync = (dir: string) => {
  return fs.readdirSync(dir).reduce((files: Array<string>, file: string) => {
    const name = `${dir}/${file}`;
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...walkSync(name)] : [...files, name];
  }, []);
}

export default (app: Application, dir: string) => {
  dir = dir.replace(/\\/g, '/');
  const files = walkSync(dir);
  files.forEach((file: string) => {
    const route = require(file);
    let path = file.substring(dir.length + 1);
    const fileName = path.split('/').pop().split('.')[0] || '';
    if(path.match(/\[[a-zA-Z0-9]+]/g)) {
      const params = path.match(/\[[a-zA-Z0-9]+]/g);
      params?.forEach((param: string) => {
        path = path.replace(param, `:${param.substring(1, param.length - 1)}`);
      });
    }

    if(fileName === 'index') {
      if(route?.post)
        app.post(`/${path.split('/').slice(0, -1).join('/')}`, route.post);
      if(route?.get)
        app.get(`/${path.split('/').slice(0, -1).join('/')}`, route.get);
      if(route?.put)
        app.put(`/${path.split('/').slice(0, -1).join('/')}`, route.put);
      if(route?.delete)
        app.delete(`/${path.split('/').slice(0, -1).join('/')}`, route.delete);
      return;
    }

    if(route?.post)
      app.post(`/${path.split('/').slice(0, -1).join('/')}/${fileName}`, route.post);
    if(route?.get)
      app.get(`/${path.split('/').slice(0, -1).join('/')}/${fileName}`, route.get);
    if(route?.put)
      app.put(`/${path.split('/').slice(0, -1).join('/')}/${fileName}`, route.put);
    if(route?.delete)
      app.delete(`/${path.split('/').slice(0, -1).join('/')}/${fileName}`, route.delete);
  });
}