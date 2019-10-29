/*
 * Filename: node-express.ts
 * Created Date: Tuesday, October 29th 2019, 6:01:11 pm
 * Author: Adithya Sreyaj
 *
 * Copyright (c) 2019 Adithya Sreyaj
 */

import * as vscode from 'vscode';
import { Helpers } from '../helpers';

export const createNPMPackageProjectDisposable = vscode.commands.registerCommand(
  'extension.creatNPMPackageProject',
  () => {
    const helper = new Helpers();
    const depHelper = helper.getDependencyHelper();
    depHelper.installDependencies();
  },
);
