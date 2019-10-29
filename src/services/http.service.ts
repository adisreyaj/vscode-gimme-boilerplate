import fetch, { Response } from 'node-fetch';

export class HttpService {
  public async getPackagesForNodeExpress(): Promise<Response> {
    return fetch('https://api.myjson.com/bins/152nvw').then((res) =>
      res.json(),
    );
  }
  public async getTSConfigForNodeExpress(): Promise<Response> {
    return fetch(
      'https://raw.githubusercontent.com/adisreyaj/dockerfiles/master/Node/Dockerfile',
    ).then((res) => res.json());
  }

  public getPackageJSON(type: 'node' | 'npm') {
    switch (type) {
      case 'node':
        return fetch('https://api.myjson.com/bins/16vuc4').then((res) =>
          res.json(),
        );
      case 'npm':
        return fetch('https://api.myjson.com/bins/16vuc4').then((res) =>
          res.json(),
        );
    }
  }

  public getDirectories() {
    return fetch('https://api.myjson.com/bins/xu1xw').then((res) => res.json());
  }

  public getFiles() {
    return fetch('https://api.myjson.com/bins/qyhwk').then((res) => res.json());
  }
}
