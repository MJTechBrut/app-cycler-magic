
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAppCycler } from '@/hooks/use-app-cycler';
import { motion } from 'framer-motion';
import { CarFront, Gamepad2 } from 'lucide-react';

const CanBusSimulator = () => {
  const { cycleToNextApp, isServiceActive } = useAppCycler();
  
  const handleModePress = () => {
    if (!isServiceActive) {
      console.log('[CAN Simulator] Service not active, mode button press ignored');
      return;
    }
    
    console.log('[CAN Simulator] Simulating MODE button press on steering wheel');
    cycleToNextApp();
  };
  
  return (
    <motion.div 
      className="fixed bottom-20 right-4 p-3 glass-card rounded-lg shadow-lg z-50"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Gamepad2 className="w-4 h-4" />
          <span className="text-sm font-medium">CAN Bus Simulator</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">Virtual Steering Controls</p>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full"
          onClick={handleModePress}
        >
          MODE Button
        </Button>
      </div>
      
      <div className="flex justify-center mt-3">
        <CarFront className="w-5 h-5 text-muted-foreground" />
      </div>
    </motion.div>
  );
};

export default CanBusSimulator;
