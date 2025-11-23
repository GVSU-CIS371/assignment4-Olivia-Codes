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
    currentBase: "" as string, 
    syrups: [] as SyrupType[],
    currentSyrup: "" as string, 
    creamers: [] as CreamerType[],
    currentCreamer: "" as string, 
    beverages: [] as BeverageType[],
    beverageName: "", 
    isLoaded: false, 
  }),

  actions: {

    async init() {
      try {
     
        const basesSnapshot = await getDocs(collection(db, "bases"));
        this.bases = basesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BaseBeverageType[];

   
        const creamersSnapshot = await getDocs(collection(db, "creamers"));
        this.creamers = creamersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CreamerType[];

      
        const syrupsSnapshot = await getDocs(collection(db, "syrups"));
        this.syrups = syrupsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SyrupType[];

     
        if (this.bases.length > 0) {
          this.currentBase = this.bases[0].id;
        }
        if (this.creamers.length > 0) {
          this.currentCreamer = this.creamers[0].id;
        }
        if (this.syrups.length > 0) {
          this.currentSyrup = this.syrups[0].id;
        }

     
        this.loadBeverages();

 
        this.isLoaded = true;

        console.log("Data loaded from Firestore successfully!");
      } catch (error) {
        console.error("Error loading data from Firestore:", error);
      }
    },

 
    loadBeverages() {
      const beveragesRef = collection(db, "beverages");
      
   
      onSnapshot(beveragesRef, (snapshot) => {
        this.beverages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BeverageType[];
        
        console.log(`Loaded ${this.beverages.length} beverages from Firestore`);
      });
    },


    async makeBeverage() {
  
      if (!this.beverageName || this.beverageName.trim() === "") {
        alert("Please enter a beverage name!");
        return;
      }


      const base = this.bases.find((b) => b.id === this.currentBase);
      const creamer = this.creamers.find((c) => c.id === this.currentCreamer);
      const syrup = this.syrups.find((s) => s.id === this.currentSyrup);


      const newBeverage: Omit<BeverageType, "id"> = {
        name: this.beverageName.trim(),
        temp: this.currentTemp,
        base: base!,
        creamer: creamer!,
        syrup: syrup!,
      };

      try {
   
        await addDoc(collection(db, "beverages"), newBeverage);
        
        console.log("Beverage saved to Firestore:", newBeverage);
        

        this.beverageName = "";
        
    
        alert(`${newBeverage.name} has been saved!`);
      } catch (error) {
        console.error("Error saving beverage to Firestore:", error);
        alert("Failed to save beverage. Please try again.");
      }
    },


    showBeverage(beverage: BeverageType) {
  
      this.currentTemp = beverage.temp;
      this.currentBase = beverage.base.id;
      this.currentCreamer = beverage.creamer.id;
      this.currentSyrup = beverage.syrup.id;
      this.beverageName = beverage.name;
      
      console.log("Displaying beverage:", beverage.name);
    },
  },
});
