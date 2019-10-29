import { HttpService } from '../services/http.service';
import * as vscode from 'vscode';
import * as fs from 'fs';
export class PackageJSONHelper {
  private http: HttpService;
  constructor() {
    this.http = new HttpService();
  }
  public createThePackageJSONFile() {
    return new Promise((resolve, reject) => {
      try {
        this.http.getPackageJSON('node').then((file) => {
          const cwd = vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : '';

          fs.writeFileSync(
            `${cwd}/package.json`,
            JSON.stringify(file, undefined, 2),
          );
          resolve('Package.json created');
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
