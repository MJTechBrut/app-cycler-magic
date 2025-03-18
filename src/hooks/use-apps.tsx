
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { AppInfo } from '@/types/apps';
import { Capacitor } from '@capacitor/core';

// Mock data as fallback for web preview
const MOCK_APPS: AppInfo[] = [
  { name: 'Google Maps', packageName: 'com.google.android.apps.maps', launchable: true },
  { name: 'Spotify', packageName: 'com.spotify.music', launchable: true },
  { name: 'Waze', packageName: 'com.waze', launchable: true },
  { name: 'YouTube', packageName: 'com.google.android.youtube', launchable: true },
  { name: 'Podcast Addict', packageName: 'com.bambuna.podcastaddict', launchable: true },
  { name: 'VLC Media Player', packageName: 'org.videolan.vlc', launchable: true },
  { name: 'Uber', packageName: 'com.ubercab', launchable: true },
  { name: 'Audible', packageName: 'com.audible.application', launchable: true },
  { name: 'Netflix', packageName: 'com.netflix.mediaclient', launchable: true },
  { name: 'Weather', packageName: 'com.weather.forecast', launchable: true },
  { name: 'Apple Music', packageName: 'com.apple.android.music', launchable: true },
  { name: 'Pandora', packageName: 'com.pandora.android', launchable: true },
  { name: 'SiriusXM', packageName: 'com.sirius', launchable: true },
  { name: 'iHeartRadio', packageName: 'com.clearchannel.iheartradio.controller', launchable: true },
  { name: 'Amazon Music', packageName: 'com.amazon.mp3', launchable: true },
  { name: 'Google Play Music', packageName: 'com.google.android.music', launchable: true },
  { name: 'SoundCloud', packageName: 'com.soundcloud.android', launchable: true },
  { name: 'Tidal', packageName: 'com.aspiro.tidal', launchable: true }
];

export function useApps() {
  const [installedApps, setInstalledApps] = useState<AppInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setIsLoading(true);

        // Check if running on Android
        if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
          try {
            // This requires the native Android plugin implementation
            console.log('Attempting to fetch real installed apps from Android');
            
            // The AppLauncher plugin must be implemented in native Android code
            // It should use PackageManager to get the list of installed apps
            const result = await (window as any).Capacitor.Plugins.AppLauncher?.getInstalledApps();

            if (result && result.apps) {
              // Convert native app format to our AppInfo format
              const nativeApps: AppInfo[] = result.apps.map((app: any) => ({
                name: app.appName,
                packageName: app.packageName,
                icon: app.iconBase64 || undefined,
                launchable: app.launchable
              }));
              
              setInstalledApps(nativeApps);
              console.log(`Found ${nativeApps.length} real installed apps`);
            } else {
              // Native plugin not available or failed
              console.log('Native AppLauncher plugin not implemented - see console for details');
              toast({
                title: "Native Plugin Required",
                description: "This app requires a custom Android plugin to access installed apps",
                variant: "destructive",
              });
              setInstalledApps(MOCK_APPS);
            }
          } catch (nativeError) {
            console.error('Error accessing native Android API:', nativeError);
            toast({
              title: "Native Plugin Error",
              description: "Error accessing Android package manager API",
              variant: "destructive",
            });
            setInstalledApps(MOCK_APPS);
          }
        } else {
          // Web environment - use mock data
          console.log('Using mock app data for web environment');
          await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
          setInstalledApps(MOCK_APPS);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error in useApps:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setIsLoading(false);
        toast({
          title: "Error loading apps",
          description: "Could not load installed applications",
          variant: "destructive",
        });
      }
    };
    
    fetchApps();
  }, []);
  
  return { installedApps, isLoading, error };
}

export function useAppLauncher() {
  // Launch app using Android Intent
  const launchApp = async (packageName: string): Promise<boolean> => {
    try {
      if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
        // This requires the native Android plugin implementation
        // It should create an Intent to launch the app with the given packageName
        const result = await (window as any).Capacitor.Plugins.AppLauncher?.launchApp({
          packageName: packageName
        });
        
        if (!result?.success) {
          toast({
            title: "Native Plugin Required",
            description: "Full app launching requires a custom Android plugin",
            variant: "destructive",
          });
        }
        
        console.log(`Attempted to launch app: ${packageName}`);
        return result?.success || false;
      } else {
        // Web simulation
        console.log(`[WEB] Launching app simulation: ${packageName}`);
        toast({
          title: "App Launch Simulated",
          description: `Would launch: ${packageName}`,
        });
        return true;
      }
    } catch (error) {
      console.error('Error launching app:', error);
      toast({
        title: "Error Launching App",
        description: `Could not launch ${packageName}`,
        variant: "destructive",
      });
      return false;
    }
  };
  
  return { launchApp };
}
