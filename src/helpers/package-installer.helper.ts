import * as vscode from 'vscode';
import * as child_process from 'child_process';

import { HttpService } from '../services/http.service';
export class DepInstallHelpers {
  http: HttpService;
  constructor() {
    this.http = new HttpService();
  }
  public async installDependencies(
    type: 'node' | 'npm',
  ): Promise<vscode.Terminal> {
    return new Promise((resolve, reject) => {
      try {
        this.http
          .getPackages(type)
          .then((response: any) => {
            const dependencies = response.dependencies;
            const devDependencies = response.devDependencies;
            const cwd = vscode.workspace.workspaceFolders
              ? vscode.workspace.workspaceFolders[0].uri.fsPath
              : undefined;

            const terminal = vscode.window.createTerminal({
              name: 'Install Deps',
              cwd,
              hideFromUser: false,
            });
            if (dependencies && dependencies.length !== 0) {
              const depInstallCommand = this.getNPMInstallCommand(dependencies);
              this.sendInstallCommandToTerminal(terminal, depInstallCommand);
            }
            if (devDependencies && devDependencies.length !== 0) {
              const devDepInstallCommand = this.getNPMInstallCommand(
                devDependencies,
                true,
              );
              this.sendInstallCommandToTerminal(terminal, devDepInstallCommand);
            }
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
