import * as vscode from 'vscode';
import * as fs from 'fs';
import { HttpService } from '../services/http.service';
export class FilesFoldersHelper {
  http: HttpService;
  constructor() {
    this.http = new HttpService();
  }
  public async createFoldersForNodeExpress(): Promise<String> {
    return new Promise((resolve, reject) => {
      try {
        this.http.getDirectories().then((result: { directories: string[] }) => {
          const directories = result.directories;
          const cwd = vscode.workspace.workspaceFolders
            ? vscode.workspace.workspaceFolders[0].uri.fsPath
            : undefined;
          directories.forEach((directory) => {
            const path = `${cwd}/${directory}`;
            if (!fs.existsSync(path)) {
              fs.mkdirSync(path);
            }
          });
          resolve('Directories Created');
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
