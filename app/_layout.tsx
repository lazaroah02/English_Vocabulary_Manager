import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TraductionModeContextProvider } from '@/src/contexts/TraductionModeContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { SQLiteProvider} from 'expo-sqlite';
import 'react-native-reanimated';
import VocabularyHeaderRight from '@/components/VocabularyHeaderRight'
import ChangeTraductionMode from '@/components/ChangeTraductionMode';
import { ManageDatabaseContextProvider } from '@/src/contexts/ManageDatabaseContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName='database' assetSource={{assetId: require("@/assets/database.db")}}>
        <ManageDatabaseContextProvider>
          <TraductionModeContextProvider>
            <Stack>
              <Stack.Screen name="index" options={{headerShown: false}}/>
              <Stack.Screen name="random-word" options={{headerTitle:"Practice", headerRight:ChangeTraductionMode}}/>
              <Stack.Screen name="vocabulary" options={{headerTitle:"Vocabulary", headerRight:VocabularyHeaderRight}}/>
              <Stack.Screen name="+not-found" />
            </Stack>
          </TraductionModeContextProvider>
        </ManageDatabaseContextProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
