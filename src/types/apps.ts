
export interface AppInfo {
  name: string;
  packageName: string;
  icon?: string;
  launchable: boolean;
}

export interface AppCyclerConfig {
  apps: AppInfo[];
  serviceEnabled: boolean;
  autoStartOnBoot: boolean;
}
