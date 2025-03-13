
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { AlertCircle, PlusCircle } from 'lucide-react';
import AppCard from './AppCard';
import { AppInfo } from '@/types/apps';

interface SortableAppCardProps {
  app: AppInfo;
  index: number;
  onRemove: () => void;
}

const SortableAppCard: React.FC<SortableAppCardProps> = ({ app, index, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.packageName });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <AppCard 
        app={app} 
        index={index} 
        onRemove={onRemove} 
        isReordering={true} 
        isDragging={isDragging}
      />
    </div>
  );
};

interface AppCycleListProps {
  apps: AppInfo[];
  onAppsChange: (apps: AppInfo[]) => void;
  onAddApp: () => void;
}

const AppCycleList: React.FC<AppCycleListProps> = ({ 
  apps, 
  onAppsChange, 
  onAddApp 
}) => {
  const [isReordering, setIsReordering] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = apps.findIndex(app => app.packageName === active.id);
      const newIndex = apps.findIndex(app => app.packageName === over.id);
      
      onAppsChange(arrayMove(apps, oldIndex, newIndex));
    }
  };

  const removeApp = (packageName: string) => {
    onAppsChange(apps.filter(app => app.packageName !== packageName));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">App Cycle Order</h3>
        <div className="flex gap-2">
          <Button 
            variant={isReordering ? "outline" : "secondary"} 
            size="sm"
            onClick={() => setIsReordering(!isReordering)}
          >
            {isReordering ? "Done" : "Reorder"}
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={onAddApp}
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add App
          </Button>
        </div>
      </div>
      
      {apps.length === 0 ? (
        <motion.div 
          className="text-center p-6 border border-dashed rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AlertCircle className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No apps added to cycle list yet.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onAddApp}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Your First App
          </Button>
        </motion.div>
      ) : isReordering ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext 
            items={apps.map(app => app.packageName)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {apps.map((app, index) => (
                <SortableAppCard
                  key={app.packageName}
                  app={app}
                  index={index}
                  onRemove={() => removeApp(app.packageName)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <AnimatePresence>
          <div className="space-y-2">
            {apps.map((app, index) => (
              <AppCard
                key={app.packageName}
                app={app}
                index={index}
                onRemove={() => removeApp(app.packageName)}
              />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AppCycleList;
