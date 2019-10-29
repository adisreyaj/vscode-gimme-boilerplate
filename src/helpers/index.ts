import { PackageJSONHelper } from './packagejson.helper';
import { DepInstallHelpers } from './package-installer.helper';
import { FilesFoldersHelper } from './files-folders.helper';

export class Helpers {
  public getPackageJsonHelper() {
    return new PackageJSONHelper();
  }
  public getDependencyHelper() {
    return new DepInstallHelpers();
  }

  public getFSHelper() {
    return new FilesFoldersHelper();
  }
}
