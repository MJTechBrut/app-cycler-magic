
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const APKBuild = () => {
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Build APK Instructions</h1>
      
      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="standard">Standard Instructions</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard">
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
        </TabsContent>
        
        <TabsContent value="troubleshooting">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Troubleshooting Build Issues</CardTitle>
              <CardDescription>Common problems and solutions when building the APK</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Error: Task :capacitor-android:compileDebugJavaWithJavac FAILED</h3>
                <p>This error typically occurs due to Android SDK configuration issues:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <p className="font-medium">Install Android Studio</p>
                    <p>If you haven't already, install Android Studio from the <a href="https://developer.android.com/studio" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">official website</a>.</p>
                  </li>
                  <li>
                    <p className="font-medium">Install Android SDK</p>
                    <p>Open Android Studio → Settings/Preferences → Appearance & Behavior → System Settings → Android SDK</p>
                    <p>Install Android SDK Platform 33 (or latest) and Android SDK Build-Tools.</p>
                  </li>
                  <li>
                    <p className="font-medium">Configure Environment Variables</p>
                    <div className="bg-gray-100 p-3 rounded-md font-mono text-sm mb-2">
                      # For Windows (in PowerShell as Admin)<br/>
                      $env:ANDROID_SDK_ROOT = "C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk"<br/>
                      $env:PATH += ";$env:ANDROID_SDK_ROOT\tools;$env:ANDROID_SDK_ROOT\platform-tools"<br/><br/>
                      
                      # For macOS/Linux (in .bash_profile or .zshrc)<br/>
                      export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk<br/>
                      export PATH=$PATH:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools
                    </div>
                    <p>Replace paths with your actual SDK location.</p>
                  </li>
                  <li>
                    <p className="font-medium">Accept SDK Licenses</p>
                    <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                      # Run in terminal<br/>
                      yes | $ANDROID_SDK_ROOT/tools/bin/sdkmanager --licenses
                    </div>
                  </li>
                  <li>
                    <p className="font-medium">Using Android Studio Instead</p>
                    <p>If command-line building continues to fail, try opening the Android project in Android Studio:</p>
                    <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                      # First sync your web code<br/>
                      npx cap sync android<br/><br/>
                      
                      # Open in Android Studio<br/>
                      npx cap open android
                    </div>
                    <p>Then build the APK from Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)</p>
                  </li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Error: Failed to install the following Android SDK packages</h3>
                <p>This occurs when SDK components need updating or installing:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Open Android Studio → SDK Manager</li>
                  <li>Install any missing SDK platforms or tools that are mentioned in the error</li>
                  <li>Try the build again after installation completes</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Error: Keystore file not found</h3>
                <p>For the release build, you need a keystore file. For debugging purposes, use:</p>
                <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                  # Generate a debug keystore<br/>
                  keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000<br/><br/>
                  
                  # Move it to the right location<br/>
                  mv debug.keystore android/app/
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4">
        <Button onClick={() => window.history.back()}>Back</Button>
      </div>
    </div>
  );
};

export default APKBuild;
