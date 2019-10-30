import * as vscode from 'vscode';
import * as fs from 'fs';
import { HttpService } from '../services/http.service';
export class FilesFoldersHelper {
  private http: HttpService;
  private cwd: string | undefined;
  constructor() {
    this.http = new HttpService();
    this.cwd = vscode.workspace.workspaceFolders
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : undefined;
  }
  public async createFoldersForNodeExpress(): Promise<String> {
    return new Promise((resolve, reject) => {
      try {
        this.http.getDirectories().then((result: string[]) => {
          const directories = result;
          directories.forEach((directory) => {
            const path = `${this.cwd}/${directory}`;
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

  public async createFiles(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.http.getFiles().then((result) => {
          const files = result;
          files.forEach(async (file: { name: string; link: string }) => {
            const path = `${this.cwd}/${file.name}`;
            const content = await this.http.getFileContentsFromURL(file.link);
            fs.writeFileSync(path, content);
          });
          resolve('Directories Created');
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
