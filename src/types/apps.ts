
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

// Add specific Android permissions that we need
export interface AndroidPermission {
  name: string;
  description: string;
  required: boolean;
}

export const REQUIRED_PERMISSIONS: AndroidPermission[] = [
  {
    name: "android.permission.BIND_ACCESSIBILITY_SERVICE",
    description: "Required to monitor button presses from SWC",
    required: true
  },
  {
    name: "android.permission.SYSTEM_ALERT_WINDOW",
    description: "Required to launch apps over others",
    required: true
  },
  {
    name: "android.permission.FOREGROUND_SERVICE",
    description: "Required to run as a background service",
    required: true
  }
];
