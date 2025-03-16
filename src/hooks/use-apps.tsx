
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { AppInfo } from '@/types/apps';

// Mock data for web preview - offline ready
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
  
  // In a real app, this would use Android PackageManager APIs
  useEffect(() => {
    const fetchApps = async () => {
      try {
        // Simulate loading delay - but much shorter for offline use
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // In the real app, this would use Android's PackageManager
        // to get the list of installed apps
        
        // For now, use mock data
        setInstalledApps(MOCK_APPS);
        setIsLoading(false);
      } catch (err) {
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
  // In a real app, this would use Android Intent APIs
  const launchApp = async (packageName: string): Promise<boolean> => {
    console.log(`[MOCK] Launching app: ${packageName}`);
    toast({
      title: "App Launch Simulated",
      description: `Would launch: ${packageName}`,
    });
    return true;
  };
  
  return { launchApp };
}
