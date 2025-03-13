
import { useState, useEffect } from 'react';
import { AppInfo, AppCyclerConfig } from '@/types/apps';
import { toast } from '@/hooks/use-toast';

// Default configuration
const DEFAULT_CONFIG: AppCyclerConfig = {
  apps: [],
  serviceEnabled: false,
  autoStartOnBoot: true
};

const STORAGE_KEY = 'app_cycler_config';

export function useAppCycler() {
  const [config, setConfig] = useState<AppCyclerConfig>(DEFAULT_CONFIG);
  const [isServiceActive, setIsServiceActive] = useState(false);
  const [currentAppIndex, setCurrentAppIndex] = useState(0);
  
  // Load config from localStorage (in a real Android app, this would use SharedPreferences)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedConfig = JSON.parse(saved) as AppCyclerConfig;
        setConfig(savedConfig);
      }
    } catch (error) {
      console.error('Failed to load config', error);
    }
  }, []);
  
  // Save config to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save config', error);
    }
  }, [config]);
  
  // In a real Android app, this would check if the accessibility service is running
  useEffect(() => {
    const checkServiceStatus = () => {
      // This is a mock - in a real app this would check the accessibility service status
      setIsServiceActive(config.serviceEnabled);
    };
    
    checkServiceStatus();
    // Check every few seconds in case it's changed outside the app
    const interval = setInterval(checkServiceStatus, 3000);
    
    return () => clearInterval(interval);
  }, [config.serviceEnabled]);
  
  // Update apps in cycle
  const updateApps = (apps: AppInfo[]) => {
    setConfig({ ...config, apps });
    setCurrentAppIndex(0); // Reset current app index when apps are changed
  };
  
  // Toggle service enabled state
  const toggleServiceEnabled = () => {
    // In a real app, this would prompt the user to enable the accessibility service
    // or disable it if already enabled
    
    const newEnabled = !config.serviceEnabled;
    setConfig({ ...config, serviceEnabled: newEnabled });
    
    if (newEnabled) {
      toast({
        title: "Accessibility Service",
        description: "Please enable the App Cycler accessibility service in settings",
      });
    }
  };
  
  // Toggle auto start setting
  const toggleAutoStart = () => {
    setConfig({ ...config, autoStartOnBoot: !config.autoStartOnBoot });
  };
  
  // This would be called when the "mode" button is pressed in a real app
  const cycleToNextApp = () => {
    if (config.apps.length === 0) {
      toast({
        title: "No apps configured",
        description: "Add apps to your cycle list first",
        variant: "destructive",
      });
      return;
    }
    
    const nextIndex = (currentAppIndex + 1) % config.apps.length;
    setCurrentAppIndex(nextIndex);
    
    const nextApp = config.apps[nextIndex];
    toast({
      title: "App Cycled",
      description: `Cycling to: ${nextApp.name}`,
    });
    
    // In a real app, this would actually launch the app
    console.log(`[MOCK] Cycling to app: ${nextApp.name} (${nextApp.packageName})`);
  };
  
  // Check if accessibility service is enabled
  const checkAccessibilityPermission = (): Promise<boolean> => {
    // In a web demo, this always returns a mock value
    return Promise.resolve(config.serviceEnabled);
  };
  
  // Request accessibility permission
  const requestAccessibilityPermission = () => {
    // In a real Android app, this would open accessibility settings
    toast({
      title: "Accessibility Settings",
      description: "This would open Android's accessibility settings in the real app",
    });
    
    // Simulate enabling for the demo
    setTimeout(() => {
      setConfig({ ...config, serviceEnabled: true });
    }, 1500);
  };
  
  return {
    config,
    isServiceActive,
    currentAppIndex,
    updateApps,
    toggleServiceEnabled,
    toggleAutoStart,
    cycleToNextApp,
    checkAccessibilityPermission,
    requestAccessibilityPermission
  };
}
