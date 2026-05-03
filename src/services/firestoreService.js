/**
 * firestoreService.js
 * All Firestore and Auth operations — modular Firebase v11 only.
 * Every function gracefully returns a safe default if Firebase is not configured.
 */

import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  setDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth, isFirebaseConfigured } from './firebase';

// ─── Auth ──────────────────────────────────────────────────────────────────

/**
 * Ensures the user is signed in anonymously.
 * Returns the Firebase User object, or null if auth is unavailable.
 */
export async function ensureAnonymousAuth() {
  if (!isFirebaseConfigured || !auth) return null;
  if (auth.currentUser) return auth.currentUser;

  try {
    const credential = await signInAnonymously(auth);
    return credential.user;
  } catch (error) {
    console.error('[VoteWise] Anonymous sign-in failed:', error.message);
    return null;
  }
}

// ─── Quiz Scores ───────────────────────────────────────────────────────────

/**
 * Saves a quiz result to the `quizScores` Firestore collection.
 * @param {{ score: number, total: number, percentage: number, language: string }} params
 * @returns {Promise<boolean>} true if saved, false otherwise
 */
export async function saveQuizScore({ score, total, percentage, language }) {
  if (!isFirebaseConfigured || !db) return false;

  try {
    const user = await ensureAnonymousAuth();
    if (!user) return false;

    await addDoc(collection(db, 'quizScores'), {
      userId: user.uid,
      score,
      total,
      percentage,
      language: language || 'en',
      timestamp: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error('[VoteWise] Failed to save quiz score:', error.message);
    return false;
  }
}

/**
 * Fetches the top 10 quiz scores ordered by score descending.
 * @returns {Promise<Array>} array of score objects, empty on failure
 */
export async function getLeaderboard() {
  if (!isFirebaseConfigured || !db) return [];

  try {
    const q = query(
      collection(db, 'quizScores'),
      orderBy('score', 'desc'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error('[VoteWise] Failed to fetch leaderboard:', error.message);
    return [];
  }
}

// ─── User Stats ────────────────────────────────────────────────────────────

/**
 * Increments the chatbot message count for the current anonymous user
 * in the `userStats` collection. Uses merge so the document is created
 * on first write.
 * @returns {Promise<void>}
 */
export async function updateUserStats() {
  if (!isFirebaseConfigured || !db) return;

  try {
    const user = await ensureAnonymousAuth();
    if (!user) return;

    const userRef = doc(db, 'userStats', user.uid);
    await setDoc(
      userRef,
      {
        userId: user.uid,
        messageCount: increment(1),
        lastActive: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('[VoteWise] Failed to update user stats:', error.message);
  }
}
