
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { PlayCircle, Settings2, HelpCircle, Power } from 'lucide-react';
import AppCycleList from '@/components/AppCycleList';
import AppSelector from '@/components/AppSelector';
import StatusIndicator from '@/components/StatusIndicator';
import Header from '@/components/Header';
import CanBusSimulator from '@/components/CanBusSimulator';
import { useAppCycler } from '@/hooks/use-app-cycler';

const Index = () => {
  const { toast } = useToast();
  const { 
    config, 
    isServiceActive, 
    updateApps, 
    toggleServiceEnabled,
    cycleToNextApp,
    requestAccessibilityPermission
  } = useAppCycler();
  
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  
  const handleAddApp = (app: any) => {
    if (config.apps.some(a => a.packageName === app.packageName)) {
      toast({
        title: "App Already Added",
        description: "This app is already in your cycle list",
        variant: "destructive",
      });
      return;
    }
    
    const newApps = [...config.apps, app];
    updateApps(newApps);
    setIsSelectorOpen(false);
    
    toast({
      title: "App Added",
      description: `${app.name} added to cycle list`,
    });
  };
  
  // Determine if we're in development mode
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname.includes('lovableproject.com');
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="App Cycler" />
      
      <main className="flex-1 flex px-6 py-4 landscape-layout">
        {/* Left column - Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-1/3 pr-6"
        >
          <div className="glass-card p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Service Status</h2>
              <StatusIndicator active={isServiceActive} />
            </div>
            
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
            
            <Button 
              className="w-full mt-4"
              size="lg"
              disabled={!isServiceActive || config.apps.length === 0}
              onClick={cycleToNextApp}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Test Cycle Apps
            </Button>
          </div>
          
          <div className="mt-4 flex space-x-4">
            <Link to="/" className="flex-1">
              <Button variant="secondary" className="w-full" size="lg">
                <PlayCircle className="h-5 w-5 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/help" className="flex-1">
              <Button variant="secondary" className="w-full" size="lg">
                <HelpCircle className="h-5 w-5 mr-2" />
                Help
              </Button>
            </Link>
            <Link to="/settings" className="flex-1">
              <Button variant="secondary" className="w-full" size="lg">
                <Settings2 className="h-5 w-5 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Right column - App List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-2/3 pl-6 border-l border-border"
        >
          <AppCycleList 
            apps={config.apps} 
            onAppsChange={updateApps} 
            onAddApp={() => setIsSelectorOpen(true)}
          />
        </motion.div>
        
        <AppSelector 
          open={isSelectorOpen} 
          onOpenChange={setIsSelectorOpen}
          onSelectApp={handleAddApp}
          selectedApps={config.apps}
        />
      </main>
      
      {isDevelopment && <CanBusSimulator />}
    </div>
  );
};

export default Index;
