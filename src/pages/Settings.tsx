
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { useAppCycler } from '@/hooks/use-app-cycler';
import { Activity, AlertTriangle, Power, RotateCw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Capacitor } from '@capacitor/core';

const Settings = () => {
  const { toast } = useToast();
  const { 
    config, 
    toggleServiceEnabled,
    toggleAutoStart,
    requestAccessibilityPermission,
    isServiceActive
  } = useAppCycler();
  
  const handleClearData = () => {
    if (confirm("Are you sure you want to reset all settings? This will clear your app list and preferences.")) {
      localStorage.clear();
      toast({
        title: "Settings Reset",
        description: "All settings have been reset to default",
      });
      window.location.reload();
    }
  };
  
  const isNative = Capacitor.isNativePlatform();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Settings" showSettings={false} />
      
      <main className="flex-1 landscape-layout">
        <ScrollArea className="h-full w-full px-6 py-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 pb-8"
            >
              <div className="glass-card p-4 rounded-lg">
                <h2 className="text-lg font-medium mb-3">Accessibility Service</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Power className={`w-5 h-5 ${isServiceActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium">Accessibility Service</span>
                    </div>
                    <Switch 
                      checked={config.serviceEnabled} 
                      onCheckedChange={() => {
                        if (!config.serviceEnabled) {
                          requestAccessibilityPermission();
                        } else {
                          toggleServiceEnabled();
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <RotateCw className={`w-5 h-5 ${config.autoStartOnBoot ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium">Start on Boot</span>
                    </div>
                    <Switch 
                      checked={config.autoStartOnBoot} 
                      onCheckedChange={toggleAutoStart}
                    />
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mt-3">
                  <p>
                    The accessibility service allows App Cycler to detect when the Mode button is pressed.
                  </p>
                  {!isNative && (
                    <p className="mt-2 text-amber-500">
                      Note: Full accessibility functionality requires running on an Android device with the custom AppCycler native plugin.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <h2 className="text-lg font-medium mb-3">Appearance</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">Animation Speed</span>
                    </div>
                    <select className="bg-background border rounded-md px-2 py-1 text-sm">
                      <option value="normal">Normal</option>
                      <option value="fast">Fast</option>
                      <option value="off">Off</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-lg">
                <h2 className="text-lg font-medium mb-3">Advanced</h2>
                
                <div className="space-y-3">
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleClearData}
                  >
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Reset All Settings
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-3">
                  This will remove all apps from your cycle list and reset all settings.
                </p>
              </div>
              
              {!isNative && (
                <div className="bg-amber-950/50 p-4 rounded-lg border border-amber-500/30">
                  <h2 className="text-amber-500 text-lg font-medium mb-2">Native Plugin Required</h2>
                  <p className="text-amber-300 text-sm">
                    To make this app fully functional on an Android device, a custom native Capacitor plugin needs to be implemented.
                    This plugin would handle:
                  </p>
                  <ul className="list-disc list-inside text-amber-300 text-sm mt-2 space-y-1">
                    <li>Accessing installed apps via PackageManager</li>
                    <li>Launching apps via Intent</li>
                    <li>Managing Accessibility Service for button detection</li>
                    <li>Configuring boot startup via BroadcastReceiver</li>
                  </ul>
                </div>
              )}
              
              <div className="text-center text-xs text-muted-foreground mt-6">
                <p>App Cycler v1.0.0 {isNative ? '(Native)' : '(Web Demo)'}</p>
              </div>
            </motion.div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Settings;
