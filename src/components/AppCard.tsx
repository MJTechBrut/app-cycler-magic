
import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, MoveVertical, Check } from 'lucide-react';
import { AppInfo } from '@/types/apps';

interface AppCardProps {
  app: AppInfo;
  onRemove?: () => void;
  onReorder?: () => void;
  selected?: boolean;
  index?: number;
  selectable?: boolean;
  onSelect?: () => void;
  isReordering?: boolean;
  isDragging?: boolean;
}

const AppCard: React.FC<AppCardProps> = ({
  app,
  onRemove,
  onReorder,
  selected = false,
  index,
  selectable = false,
  onSelect,
  isReordering = false,
  isDragging = false,
}) => {
  return (
    <motion.div
      className={`app-card p-3 rounded-lg border ${selected ? 'border-primary' : 'border-border'} 
        flex items-center shadow-sm ${isDragging ? 'opacity-50' : 'opacity-100'} relative
        ${isReordering ? 'cursor-move' : selectable ? 'cursor-pointer' : 'cursor-default'}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={selectable ? onSelect : undefined}
      whileTap={selectable ? { scale: 0.98 } : undefined}
    >
      {index !== undefined && (
        <div className="absolute -left-2 -top-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
          {index + 1}
        </div>
      )}

      <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center mr-3 overflow-hidden">
        {app.icon ? (
          <img src={app.icon} alt={`${app.name} icon`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center text-secondary-foreground">
            {app.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{app.name}</div>
        <div className="text-xs text-muted-foreground truncate">{app.packageName}</div>
      </div>

      <div className="flex items-center ml-2 gap-1">
        {selected && (
          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
        )}

        {isReordering && onReorder && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReorder();
            }}
            className="p-2 touch-target text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Reorder app"
          >
            <MoveVertical className="w-5 h-5" />
          </button>
        )}

        {onRemove && !isReordering && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-2 touch-target text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Remove app"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AppCard;
