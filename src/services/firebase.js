import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import { getRemoteConfig } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Only initialize if all required keys are present — keeps the app
// functional even when Firebase env vars are not yet configured.
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

let db = null;
let auth = null;
let app = null;
let analytics = null;
let perf = null;
let remoteConfig = null;

if (isFirebaseConfigured) {
  console.log('[Firebase]: Initializing with provided configuration.');
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);

  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('[Firebase]: Analytics unavailable.', error);
    }

    try {
      perf = getPerformance(app);
    } catch (error) {
      console.warn('[Firebase]: Performance monitoring unavailable.', error);
    }

    try {
      remoteConfig = getRemoteConfig(app);
      remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
      remoteConfig.defaultConfig = {
        welcome_message: 'Learn how India votes!',
        quiz_time_limit: '15',
        featured_language: 'hi',
      };
    } catch (error) {
      console.warn('[Firebase]: Remote Config unavailable.', error);
    }
  }
} else {
  console.warn('[Firebase]: Missing required configuration. Check your .env file.');
}

export { app, db, auth, analytics, perf, remoteConfig, isFirebaseConfigured };
