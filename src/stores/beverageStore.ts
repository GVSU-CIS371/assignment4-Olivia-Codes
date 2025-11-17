import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: "" as string, // Store ID instead of object
    syrups: [] as SyrupType[],
    currentSyrup: "" as string, // Store ID instead of object
    creamers: [] as CreamerType[],
    currentCreamer: "" as string, // Store ID instead of object
    beverages: [] as BeverageType[],
    beverageName: "", // For the input field
    isLoaded: false, // Track if data is loaded from Firestore
  }),

  actions: {
    // Initialize: Load all data from Firestore
    async init() {
      try {
        // Load bases from Firestore
        const basesSnapshot = await getDocs(collection(db, "bases"));
        this.bases = basesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BaseBeverageType[];

        // Load creamers from Firestore
        const creamersSnapshot = await getDocs(collection(db, "creamers"));
        this.creamers = creamersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CreamerType[];

        // Load syrups from Firestore
        const syrupsSnapshot = await getDocs(collection(db, "syrups"));
        this.syrups = syrupsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SyrupType[];

        // Set default values (first item in each array)
        if (this.bases.length > 0) {
          this.currentBase = this.bases[0].id;
        }
        if (this.creamers.length > 0) {
          this.currentCreamer = this.creamers[0].id;
        }
        if (this.syrups.length > 0) {
          this.currentSyrup = this.syrups[0].id;
        }

        // Load saved beverages from Firestore with real-time listener
        this.loadBeverages();

        // Mark as loaded
        this.isLoaded = true;

        console.log("Data loaded from Firestore successfully!");
      } catch (error) {
        console.error("Error loading data from Firestore:", error);
      }
    },

    // Load beverages with real-time listener
    loadBeverages() {
      const beveragesRef = collection(db, "beverages");
      
      // Set up real-time listener
      onSnapshot(beveragesRef, (snapshot) => {
        this.beverages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BeverageType[];
        
        console.log(`Loaded ${this.beverages.length} beverages from Firestore`);
      });
    },

    // Make a new beverage and save to Firestore
    async makeBeverage() {
      // Validate that a name is provided
      if (!this.beverageName || this.beverageName.trim() === "") {
        alert("Please enter a beverage name!");
        return;
      }

      // Find the full objects for current selections
      const base = this.bases.find((b) => b.id === this.currentBase);
      const creamer = this.creamers.find((c) => c.id === this.currentCreamer);
      const syrup = this.syrups.find((s) => s.id === this.currentSyrup);

      // Create the beverage object
      const newBeverage: Omit<BeverageType, "id"> = {
        name: this.beverageName.trim(),
        temp: this.currentTemp,
        base: base!,
        creamer: creamer!,
        syrup: syrup!,
      };

      try {
        // Save to Firestore
        await addDoc(collection(db, "beverages"), newBeverage);
        
        console.log("Beverage saved to Firestore:", newBeverage);
        
        // Clear the name input
        this.beverageName = "";
        
        // Optional: Show success message
        alert(`${newBeverage.name} has been saved!`);
      } catch (error) {
        console.error("Error saving beverage to Firestore:", error);
        alert("Failed to save beverage. Please try again.");
      }
    },

    // Show a saved beverage (display it in the mug)
    showBeverage(beverage: BeverageType) {
      // Update current selections to match the saved beverage
      this.currentTemp = beverage.temp;
      this.currentBase = beverage.base.id;
      this.currentCreamer = beverage.creamer.id;
      this.currentSyrup = beverage.syrup.id;
      this.beverageName = beverage.name;
      
      console.log("Displaying beverage:", beverage.name);
    },
  },
});
