
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { useAppCycler } from '@/hooks/use-app-cycler';
import { Activity, AlertTriangle, Power, RotateCw } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const { 
    config, 
    toggleServiceEnabled,
    toggleAutoStart,
    requestAccessibilityPermission
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
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Settings" showSettings={false} />
      
      <main className="flex-1 container max-w-md mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="glass-card p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-3">Accessibility Service</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Power className={`w-5 h-5 ${config.serviceEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
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
            
            <p className="text-sm text-muted-foreground mt-3">
              The accessibility service allows App Cycler to detect when the Mode button is pressed.
            </p>
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
          
          <div className="text-center text-xs text-muted-foreground mt-6">
            <p>App Cycler v1.0.0</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
