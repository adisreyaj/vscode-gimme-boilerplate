/*
 * Filename: node-express.ts
 * Created Date: Tuesday, October 29th 2019, 6:01:11 pm
 * Author: Adithya Sreyaj
 *
 * Copyright (c) 2019 Adithya Sreyaj
 */

import * as vscode from 'vscode';
import { Helpers } from '../helpers';

export const createNodeExpressProjectDisposable = vscode.commands.registerCommand(
  'extension.creatNodeExpressProject',
  () => {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Gimme Boilerplate',
        cancellable: false,
      },
      (progress, token) => {
        const promises: Promise<any>[] = [];
        progress.report({ increment: 0 });
        const helper = new Helpers();
        progress.report({ increment: 10 });
        const fsHelper = helper.getFSHelper();
        const packageHelper = helper.getPackageJsonHelper();
        const depsHelper = helper.getDependencyHelper();
        progress.report({ increment: 20 });
        progress.report({
          increment: 30,
          message: 'Created package.json file',
        });
        promises.push(
          packageHelper.createThePackageJSONFile().then(() => {
            progress.report({
              increment: 50,
              message: 'Created the folder structure',
            });
          }),
        );
        promises.push(
          fsHelper.createFoldersForNodeExpress().then(() => {
            progress.report({
              increment: 60,
              message: 'Created the Folders',
            });
          }),
        );
        promises.push(
          fsHelper.createFiles().then(() => {
            progress.report({
              increment: 90,
              message: 'Created the Files',
            });
          }),
        );
        promises.push(
          depsHelper.installDependencies().then((terminal: vscode.Terminal) => {
            terminal.show();
            vscode.window.showInformationMessage(
              "Dependencies are being installed....Please Don't Interrupt",
              ...['Retry'],
            );
          }),
        );
        return new Promise((resolve, reject) => {
          Promise.all(promises)
            .then(() => {
              resolve();
            })
            .catch(() => reject());
        });
      },
    );
  },
);
