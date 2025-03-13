
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const APKBuild = () => {
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Build APK Instructions</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Building APK without Android Studio</CardTitle>
          <CardDescription>Follow these steps to build an APK</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Step 1: Get the code locally</h3>
            <p>Export this project to GitHub using the "Export to GitHub" button at the top of this interface.</p>
            <p>Clone the repository to your local machine:</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              git clone [your-github-repo-url]
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Step 2: Install dependencies</h3>
            <p>Run these commands in the project directory:</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              npm install<br/>
              npm install -g @capacitor/cli
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Step 3: Build the web app</h3>
            <p>Build the web application:</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              npm run build
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Step 4: Add Android platform</h3>
            <p>Add the Android platform to Capacitor:</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              npx cap add android
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Step 5: Sync the web code</h3>
            <p>Sync the built web code to Android:</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              npx cap sync android
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Step 6: Generate debug APK</h3>
            <p>Navigate to the Android folder and build a debug APK:</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              cd android<br/>
              ./gradlew assembleDebug
            </div>
            <p>The APK will be located at:</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
              android/app/build/outputs/apk/debug/app-debug.apk
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Step 7: Install APK on your car stereo</h3>
            <p>Transfer the APK to your car stereo using USB drive or SD card, then install it.</p>
            <p>Remember to enable "Install from unknown sources" in your car stereo's settings.</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4">
        <Button onClick={() => window.history.back()}>Back</Button>
      </div>
    </div>
  );
};

export default APKBuild;
