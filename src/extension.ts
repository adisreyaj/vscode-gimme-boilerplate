/*
 * Filename: node-express.ts
 * Created Date: Tuesday, October 29th 2019, 6:01:11 pm
 * Author: Adithya Sreyaj
 *
 * Copyright (c) 2019 Adithya Sreyaj
 */
import * as vscode from 'vscode';
import { createNodeExpressProjectDisposable } from './components/node-express';
import { createNPMPackageProjectDisposable } from './components/npm-pakage';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "gimme-boilerplate" is now active!',
  );
  context.subscriptions.push(createNodeExpressProjectDisposable);
  context.subscriptions.push(createNPMPackageProjectDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
