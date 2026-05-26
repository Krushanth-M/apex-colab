import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Apex Colab - Cloud Firebase Database Configuration
// Note: Substitute with your live Firebase console credentials when ready to deploy.
const firebaseConfig = {
  apiKey: "AIzaSyFakeApiKeyApexColabForSecurityReasons123",
  authDomain: "apex-colab-ecosystem.firebaseapp.com",
  projectId: "apex-colab-ecosystem",
  storageBucket: "apex-colab-ecosystem.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0"
};

// Initialize Firebase Core services
const app = initializeApp(firebaseConfig);

// Export Firestore database reference globally
export const db = getFirestore(app);
