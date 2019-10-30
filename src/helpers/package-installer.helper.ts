import * as vscode from 'vscode';
import * as child_process from 'child_process';

import { HttpService } from '../services/http.service';
export class DepInstallHelpers {
  http: HttpService;
  constructor() {
    this.http = new HttpService();
  }
  public async installDependencies(): Promise<vscode.Terminal> {
    return new Promise((resolve, reject) => {
      try {
        this.http
          .getPackagesForNodeExpress()
          .then((response: any) => {
            const dependencies = response.dependencies;
            const devDependencies = response.devDependencies;
            const depInstallCommand = this.getNPMInstallCommand(dependencies);
            const devDepInstallCommand = this.getNPMInstallCommand(
              devDependencies,
              true,
            );
            const cwd = vscode.workspace.workspaceFolders
              ? vscode.workspace.workspaceFolders[0].uri.fsPath
              : undefined;

            const terminal = vscode.window.createTerminal({
              name: 'Install Deps',
              cwd,
              hideFromUser: false,
            });
            this.sendInstallCommandToTerminal(terminal, depInstallCommand);
            this.sendInstallCommandToTerminal(terminal, devDepInstallCommand);
            terminal.sendText('exit', true);
            resolve(terminal);
          })
          .catch((err) => {
            throw Error(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  public getNPMInstallCommand(
    packages: string[],
    devDependency = false,
  ): string {
    if (devDependency) {
      return `npm i -D ${packages.toString().replace(/,/g, ' ')}`;
    }
    return `npm i ${packages.toString().replace(/,/g, ' ')}`;
  }

  public sendInstallCommandToTerminal(
    terminal: vscode.Terminal,
    command: string,
  ) {
    terminal.sendText(command, true);
    // terminal.dispose();
  }
}
