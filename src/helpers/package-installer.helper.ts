import * as vscode from 'vscode';
const { spawn } = require('child_process');

import { HttpService } from '../services/http.service';
export class DepInstallHelpers {
  http: HttpService;
  constructor() {
    this.http = new HttpService();
  }
  public async installDependencies() {
    this.http.getPackagesForNodeExpress().then((response: any) => {
      const dependencies = this.getPackages(response.dependencies);
      const devDependencies = this.getPackages(response.devDependencies);
      const depInstallCommand = this.getNPMInstallCommand(dependencies);
      const devDepInstallCommand = this.getNPMInstallCommand(
        devDependencies,
        true,
      );
      const cwd = vscode.workspace.workspaceFolders
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : undefined;
      const terminalforDep = vscode.window.createTerminal({
        hideFromUser: false,
        name: 'Installing Deps',
        cwd,
      });
      const terminalForDevDep = vscode.window.createTerminal({
        hideFromUser: false,
        name: 'Installing Dev Deps',
        cwd,
      });
      this.sendInstallCommandToTerminal(terminalforDep, `${depInstallCommand}`);
      this.sendInstallCommandToTerminal(
        terminalForDevDep,
        `${devDepInstallCommand}`,
      );
    });
  }

  public getPackages(dependencies: any): string[] {
    return Object.keys(dependencies);
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
    const childProces = spawn(command);
  }
}
