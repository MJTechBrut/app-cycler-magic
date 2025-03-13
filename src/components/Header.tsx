
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Settings, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showSettings?: boolean;
  showInfo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showSettings = true, 
  showInfo = true 
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.header 
      className="px-4 py-3 flex items-center justify-between bg-background/90 backdrop-blur-sm sticky top-0 z-10 border-b"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1 
        className="text-xl font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {title}
      </motion.h1>
      
      <div className="flex items-center gap-2">
        {showInfo && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/help')}
            className="touch-target"
            aria-label="Help information"
          >
            <Info className="h-5 w-5" />
          </Button>
        )}
        
        {showSettings && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="touch-target"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
