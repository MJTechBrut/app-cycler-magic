
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface StatusIndicatorProps {
  active: boolean;
  pulsing?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  active, 
  pulsing = true
}) => {
  const { toast } = useToast();
  
  const handleClick = () => {
    if (active) {
      toast({
        title: "Service Active",
        description: "App Cycler is currently active and monitoring SWC button presses",
      });
    } else {
      toast({
        title: "Service Inactive",
        description: "App Cycler service is not currently active. Enable accessibility service to use it.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <motion.div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <div 
        className={`w-2.5 h-2.5 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'} ${pulsing ? 'status-indicator' : ''} ${!active ? 'inactive' : ''}`}
      />
      <span className="text-sm font-medium">
        {active ? 'Active' : 'Inactive'}
      </span>
    </motion.div>
  );
};

export default StatusIndicator;
