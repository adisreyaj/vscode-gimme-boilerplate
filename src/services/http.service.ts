import fetch, { Response } from 'node-fetch';

export class HttpService {
  private nodeExpressConfigURL =
    'https://raw.githubusercontent.com/adisreyaj/gimme-boilerplate-config/master/node-express-config.json';
  public async getPackagesForNodeExpress(): Promise<Response> {
    return fetch(this.nodeExpressConfigURL).then((res) => res.json());
  }

  public async getPackageJSON(type: 'node' | 'npm') {
    switch (type) {
      case 'node':
        return fetch(this.nodeExpressConfigURL)
          .then((res) => res.json())
          .then((res) => res.package);
      case 'npm':
        return fetch('https://api.myjson.com/bins/16vuc4').then((res) =>
          res.json(),
        );
    }
  }

  public async getDirectories() {
    return fetch(this.nodeExpressConfigURL)
      .then((res) => res.json())
      .then((res) => res.directories);
  }

  public async getFiles() {
    return fetch(this.nodeExpressConfigURL)
      .then((res) => res.json())
      .then((res) => res.files);
  }

  public async getFileContentsFromURL(url: string): Promise<string> {
    return fetch(url).then((res) => res.text());
  }
}
