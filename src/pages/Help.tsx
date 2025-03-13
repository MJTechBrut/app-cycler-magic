
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ArrowRight, HelpCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Step = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <motion.div 
    className="flex gap-4 mb-6"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: number * 0.1 }}
  >
    <div className="flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
        {number}
      </div>
    </div>
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
  <motion.div 
    className="mb-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h3 className="font-medium flex items-center gap-2 mb-1">
      <HelpCircle className="h-4 w-4 text-primary" />
      {question}
    </h3>
    <p className="text-sm text-muted-foreground ml-6">{answer}</p>
  </motion.div>
);

const Help = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Help & Setup" showInfo={false} />
      
      <main className="flex-1 container max-w-md mx-auto p-4 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-4 rounded-lg mb-6"
        >
          <h2 className="text-lg font-medium mb-3">Getting Started</h2>
          
          <Step 
            number={1} 
            title="Select Your Apps" 
            description="Add the apps you want to cycle through from the home screen."
          />
          
          <Step 
            number={2} 
            title="Enable Accessibility Service" 
            description="Grant App Cycler permission to detect when the 'Mode' button is pressed."
          />
          
          <Step 
            number={3} 
            title="Set App Cycler as Default" 
            description="In your head unit settings, set App Cycler as the default navigation app."
          />
          
          <Step 
            number={4} 
            title="Test It Out" 
            description="Press the 'Mode' button on your steering wheel to cycle through your apps."
          />
          
          <div className="mt-4">
            <Link to="/">
              <Button className="w-full">
                Go to App Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card p-4 rounded-lg mb-6"
        >
          <h2 className="text-lg font-medium mb-3">Accessibility Service</h2>
          
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm">App Cycler needs accessibility permissions to detect when you press the Mode button.</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            The accessibility service only monitors for button presses from your steering wheel controls.
            It does not collect any personal data or monitor your other activities.
          </p>
          
          <Button variant="outline" className="w-full">
            Enable Accessibility Service
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass-card p-4 rounded-lg"
        >
          <h2 className="text-lg font-medium mb-3">FAQ</h2>
          
          <FaqItem 
            question="Will this work with any car stereo?" 
            answer="App Cycler works with Android-based head units that support application switching via SWC mode button."
          />
          
          <FaqItem 
            question="Does it require root access?" 
            answer="No, App Cycler uses Android's accessibility service which doesn't require root access."
          />
          
          <FaqItem 
            question="What if an app isn't showing in the list?" 
            answer="Only apps that are launchable will appear in the list. System apps may not be available."
          />
          
          <FaqItem 
            question="Will this drain my battery?" 
            answer="App Cycler uses minimal resources and only activates when the mode button is pressed."
          />
          
          <div className="mt-4 pt-4 border-t">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center text-sm text-primary"
            >
              Visit Support Website
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Help;
