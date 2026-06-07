// ═══════════════════════════════════════════
//  firebase.js  —  shared backend
// ═══════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAD-UhqgPn0uQu5CLM6hqw-T_vMkosIiXg",
  authDomain:        "zaralive-c9857.firebaseapp.com",
  databaseURL:       "https://zaralive-c9857-default-rtdb.firebaseio.com",
  projectId:         "zaralive-c9857",
  storageBucket:     "zaralive-c9857.firebasestorage.app",
  messagingSenderId: "1030205890993",
  appId:             "1:1030205890993:web:65e6ba89c9f5633c7e1d90",
  measurementId:     "G-5GFE5DLDT5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

// ── Google Sign-In ──────────────────────────
export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  const result   = await signInWithPopup(auth, provider);
  return result.user;
}

// ── Save / get user profile ─────────────────
export async function saveUserProfile(uid, data) {
  await setDoc(doc(db, "users", uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

// ── Auth state check ────────────────────────
export function checkAuth(callback) {
  onAuthStateChanged(auth, callback);
}

export { signOut };
