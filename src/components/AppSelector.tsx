
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import AppCard from './AppCard';
import { AppInfo } from '@/types/apps';
import { useApps } from '@/hooks/use-apps';

interface AppSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectApp: (app: AppInfo) => void;
  selectedApps?: AppInfo[];
}

const AppSelector: React.FC<AppSelectorProps> = ({
  open,
  onOpenChange,
  onSelectApp,
  selectedApps = []
}) => {
  const { installedApps, isLoading } = useApps();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApps, setFilteredApps] = useState<AppInfo[]>([]);

  useEffect(() => {
    if (installedApps.length > 0) {
      setFilteredApps(
        installedApps.filter(app => 
          !selectedApps.some(selected => selected.packageName === app.packageName) &&
          (app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          app.packageName.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
  }, [installedApps, searchTerm, selectedApps]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="landscape-dialog sm:max-w-3xl max-h-[400px] overflow-hidden flex flex-col">
        <DialogHeader className="mb-2">
          <DialogTitle>Select App</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search apps..."
            className="pl-9 pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading installed apps...</p>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-muted-foreground mb-2">No apps found</p>
              {searchTerm && (
                <p className="text-sm text-muted-foreground">Try a different search term</p>
              )}
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-2">
                {filteredApps.map(app => (
                  <motion.div
                    key={app.packageName}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <AppCard 
                      app={app}
                      selectable={true}
                      onSelect={() => onSelectApp(app)}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppSelector;
