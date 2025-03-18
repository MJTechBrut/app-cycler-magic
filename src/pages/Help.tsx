
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { ScrollArea } from '@/components/ui/scroll-area';

const Help = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Help" />
      
      <main className="flex-1 landscape-layout">
        <ScrollArea className="h-full w-full px-6 py-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="pb-8"
            >
              <Tabs defaultValue="getting-started">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
                  <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
                </TabsList>
                
                <TabsContent value="getting-started" className="space-y-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h2 className="text-lg font-medium mb-3">Getting Started</h2>
                    <ol className="list-decimal list-inside space-y-2 pl-1">
                      <li>Add apps to your cycle list from the main screen</li>
                      <li>Enable the accessibility service in Settings</li>
                      <li>Press the Mode button on your steering wheel to cycle between apps</li>
                    </ol>
                  </div>
                  
                  <div className="glass-card p-4 rounded-lg">
                    <h2 className="text-lg font-medium mb-3">Requirements</h2>
                    <ul className="list-disc list-inside space-y-2 pl-1">
                      <li>Android Auto-compatible head unit</li>
                      <li>Compatible steering wheel controls with Mode button</li>
                      <li>Accessibility service enabled</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="how-it-works" className="space-y-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h2 className="text-lg font-medium mb-3">How App Cycler Works</h2>
                    <p className="text-sm">
                      App Cycler uses Android's Accessibility Service to detect when you press the Mode button on your steering wheel controls. When detected, it automatically launches the next app in your predefined cycle list.
                    </p>
                    <p className="text-sm mt-3">
                      The sequence follows the order you set in the main screen. You can reorder apps by using the "Reorder" button.
                    </p>
                  </div>
                  
                  <div className="glass-card p-4 rounded-lg">
                    <h2 className="text-lg font-medium mb-3">Accessibility Service</h2>
                    <p className="text-sm">
                      The accessibility service runs in the background and monitors for specific button presses from your steering wheel controls. It only activates when the Mode button is pressed and consumes minimal resources.
                    </p>
                    <p className="text-sm mt-3">
                      This service starts automatically when your device boots if the "Start on Boot" setting is enabled.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="troubleshooting" className="space-y-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h2 className="text-lg font-medium mb-3">Common Issues</h2>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">Mode button not working</h3>
                        <p className="text-sm text-muted-foreground">
                          Make sure the accessibility service is enabled in Settings. If it's already enabled, try disabling and enabling it again.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">App not launching</h3>
                        <p className="text-sm text-muted-foreground">
                          Ensure the app is correctly installed on your device and hasn't been updated or moved to external storage.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">Service stops working</h3>
                        <p className="text-sm text-muted-foreground">
                          Some devices have aggressive battery optimization. Make sure App Cycler is excluded from battery optimization in your Android settings.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-4 rounded-lg">
                    <h2 className="text-lg font-medium mb-3">Contact Support</h2>
                    <p className="text-sm">
                      If you're experiencing issues not covered here, please contact our support team at support@appcycler.com or visit our website for more resources.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Help;
