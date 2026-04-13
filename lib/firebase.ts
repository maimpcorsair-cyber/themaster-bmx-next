import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase-config';

let app: FirebaseApp;
let db: Firestore;

export const initFirebase = () => {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    app = getApps()[0];
    db = getFirestore(app);
  }
  return { app, db };
};

export { db, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy };

// Product interface
export interface Product {
  id?: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
  specs?: { [key: string]: string };
  badge?: string;
  rating?: number;
  reviews?: number;
}

// Promotion interface
export interface Promotion {
  id?: string;
  code: string;
  discount: number; // percentage
  active: boolean;
}

// Initialize Firebase on import
initFirebase();
