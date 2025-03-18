
import { useState, useEffect } from 'react';
import { AppInfo, AppCyclerConfig } from '@/types/apps';
import { toast } from '@/hooks/use-toast';
import { Capacitor } from '@capacitor/core';

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
  
  // Load config from localStorage or Android SharedPreferences
  useEffect(() => {
    const loadConfig = async () => {
      try {
        if (Capacitor.isNativePlatform()) {
          // On native platform, try to load from SharedPreferences via native plugin
          try {
            // This requires native Android plugin implementation to access SharedPreferences
            const result = await (window as any).Capacitor.Plugins.AppCycler?.getConfig();
            if (result && result.config) {
              setConfig(JSON.parse(result.config));
              return;
            } else {
              console.log('Native AppCycler plugin not implemented or failed - falling back to localStorage');
            }
          } catch (e) {
            console.error('Error loading config from native:', e);
            // Fall back to localStorage
          }
        }
        
        // Load from localStorage (fallback)
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const savedConfig = JSON.parse(saved) as AppCyclerConfig;
          setConfig(savedConfig);
        }
      } catch (error) {
        console.error('Failed to load config', error);
      }
    };
    
    loadConfig();
  }, []);
  
  // Save config whenever it changes
  useEffect(() => {
    const saveConfig = async () => {
      try {
        // Save to localStorage (works on web and as backup on native)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        
        // On native platform, also save to SharedPreferences
        if (Capacitor.isNativePlatform()) {
          try {
            // This requires native Android plugin implementation
            await (window as any).Capacitor.Plugins.AppCycler?.saveConfig({
              config: JSON.stringify(config)
            });
          } catch (e) {
            console.error('Error saving to native:', e);
          }
        }
      } catch (error) {
        console.error('Failed to save config', error);
      }
    };
    
    saveConfig();
  }, [config]);
  
  // Check accessibility service status
  useEffect(() => {
    const checkServiceStatus = async () => {
      if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
        try {
          // This requires native Android plugin implementation
          // It should check if the AppCycler accessibility service is enabled
          const result = await (window as any).Capacitor.Plugins.AppCycler?.checkServiceStatus();
          if (result) {
            setIsServiceActive(result.active);
            
            // Update config if it doesn't match actual status
            if (config.serviceEnabled !== result.active) {
              setConfig(prev => ({ ...prev, serviceEnabled: result.active }));
            }
          } else {
            console.log('Native AppCycler plugin not implemented or failed');
            // Fall back to config value
            setIsServiceActive(config.serviceEnabled);
          }
        } catch (e) {
          console.error('Error checking service status:', e);
          // Fall back to config value
          setIsServiceActive(config.serviceEnabled);
        }
      } else {
        // Web fallback
        setIsServiceActive(config.serviceEnabled);
      }
    };
    
    checkServiceStatus();
    
    // Check periodically
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
    const newEnabled = !config.serviceEnabled;
    setConfig({ ...config, serviceEnabled: newEnabled });
    
    // On Android, this would open accessibility settings
    if (newEnabled && Capacitor.isNativePlatform()) {
      requestAccessibilityPermission();
    }
  };
  
  // Toggle auto start setting
  const toggleAutoStart = () => {
    const newAutoStart = !config.autoStartOnBoot;
    setConfig({ ...config, autoStartOnBoot: newAutoStart });
    
    // On Android, update the boot receiver
    if (Capacitor.isNativePlatform()) {
      try {
        // This requires native Android plugin implementation
        // It should register/unregister a BroadcastReceiver for BOOT_COMPLETED
        (window as any).Capacitor.Plugins.AppCycler?.setAutoStart({
          enabled: newAutoStart
        });
      } catch (e) {
        console.error('Error setting auto start:', e);
      }
    }
  };
  
  // This would be called when the "mode" button is pressed
  const cycleToNextApp = async () => {
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
    
    // Actually launch the app
    if (Capacitor.isNativePlatform()) {
      try {
        // This requires native Android plugin implementation
        // It should create an Intent to launch the app
        await (window as any).Capacitor.Plugins.AppLauncher?.launchApp({
          packageName: nextApp.packageName
        });
      } catch (e) {
        console.error('Error launching app:', e);
        toast({
          title: "Error",
          description: `Failed to launch ${nextApp.name}`,
          variant: "destructive",
        });
      }
    } else {
      // Web simulation
      console.log(`[WEB] Cycling to app: ${nextApp.name} (${nextApp.packageName})`);
    }
  };
  
  // Check if accessibility service is enabled
  const checkAccessibilityPermission = async (): Promise<boolean> => {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
      try {
        // This requires native Android plugin implementation
        // It should check if the accessibility service permission is granted
        const result = await (window as any).Capacitor.Plugins.AppCycler?.checkAccessibilityPermission();
        return result?.granted || false;
      } catch (e) {
        console.error('Error checking accessibility permission:', e);
        return false;
      }
    }
    
    // Web demo fallback
    return config.serviceEnabled;
  };
  
  // Request accessibility permission
  const requestAccessibilityPermission = async () => {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
      try {
        // This requires native Android plugin implementation
        // It should open Android accessibility settings for the app
        await (window as any).Capacitor.Plugins.AppCycler?.requestAccessibilityPermission();
      } catch (e) {
        console.error('Error requesting accessibility permission:', e);
        toast({
          title: "Native Plugin Required",
          description: "Custom Android plugin needed to open accessibility settings",
          variant: "destructive",
        });
      }
    } else {
      // Web simulation
      toast({
        title: "Accessibility Settings",
        description: "This would open Android's accessibility settings in the real app",
      });
      
      // Simulate enabling for the demo
      setTimeout(() => {
        setConfig({ ...config, serviceEnabled: true });
      }, 1500);
    }
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
