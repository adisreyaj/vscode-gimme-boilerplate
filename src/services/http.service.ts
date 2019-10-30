import fetch, { Response } from 'node-fetch';

export class HttpService {
  private nodeExpressConfigURL =
    'https://raw.githubusercontent.com/adisreyaj/gimme-boilerplate-config/master/node-express-config.json';
  private npmPackageConfigURL =
    'https://raw.githubusercontent.com/adisreyaj/gimme-boilerplate-config/master/npm-package.json';
  public async getPackages(type: 'node' | 'npm'): Promise<Response> {
    return fetch(
      type === 'node' ? this.nodeExpressConfigURL : this.npmPackageConfigURL,
    ).then((res) => res.json());
  }

  public async getPackageJSON(type: 'node' | 'npm') {
    return fetch(
      type === 'node' ? this.nodeExpressConfigURL : this.npmPackageConfigURL,
    )
      .then((res) => res.json())
      .then((res) => res.package);
  }

  public async getDirectories(type: 'node' | 'npm') {
    return fetch(
      type === 'node' ? this.nodeExpressConfigURL : this.npmPackageConfigURL,
    )
      .then((res) => res.json())
      .then((res) => res.directories);
  }

  public async getFiles(type: 'node' | 'npm') {
    return fetch(
      type === 'node' ? this.nodeExpressConfigURL : this.npmPackageConfigURL,
    )
      .then((res) => res.json())
      .then((res) => res.files);
  }

  public async getFileContentsFromURL(url: string): Promise<string> {
    return fetch(url).then((res) => res.text());
  }
}
