
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
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="App Cycler" />
      
      <main className="flex-1 container max-w-md mx-auto p-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 glass-card p-4 rounded-lg"
        >
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
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
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
      
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-3"
      >
        <div className="container max-w-md mx-auto flex justify-around">
          <Link to="/">
            <Button variant="ghost" className="flex flex-col items-center h-auto py-2">
              <PlayCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link to="/help">
            <Button variant="ghost" className="flex flex-col items-center h-auto py-2">
              <HelpCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Help</span>
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className="flex flex-col items-center h-auto py-2">
              <Settings2 className="h-5 w-5 mb-1" />
              <span className="text-xs">Settings</span>
            </Button>
          </Link>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
