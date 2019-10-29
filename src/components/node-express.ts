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
  async () => {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Gimme Boilerplate',
        cancellable: false,
      },
      async (progress, token) => {
        progress.report({ increment: 0 });
        const helper = new Helpers();
        progress.report({ increment: 10 });
        const fsHelper = helper.getFSHelper();
        const packageHelper = helper.getPackageJsonHelper();
        progress.report({ increment: 20 });
        progress.report({
          increment: 50,
          message: 'Created package.json file',
        });
        await packageHelper.createThePackageJSONFile();
        progress.report({
          increment: 90,
          message: 'Created the folder structure',
        });
        await fsHelper.createFoldersForNodeExpress();
        progress.report({
          increment: 100,
          message: 'Done',
        });
      },
    );
  },
);
