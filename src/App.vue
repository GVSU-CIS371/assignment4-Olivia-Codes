<template>
  <div id="app">
  
    <div v-if="!store.isLoaded" class="loading">
      Loading beverages from cloud...
    </div>

    <div v-else>
    
      <Beverage :beverage="currentBeverageObject" />

      
      <div class="beverage-form">
      
        <div class="name-input-section">
          <label for="beverage-name">Name:</label>
          <input 
            type="text" 
            id="beverage-name" 
            v-model="store.beverageName" 
            placeholder="Enter beverage name"
          />
          <button @click="store.makeBeverage()" class="make-beverage-btn">
            🍺 Make Beverage
          </button>
        </div>

        <ul>
      
          <li>
            <h3>Temperature</h3>
            <template v-for="temp in store.temps" :key="temp">
              <label>
                <input
                  type="radio"
                  name="temperature"
                  :id="`r${temp}`"
                  :value="temp"
                  v-model="store.currentTemp"
                />
                {{ temp }}
              </label>
            </template>
          </li>

        
          <li>
            <h3>Drink</h3>
            <template v-for="beverage in store.bases" :key="beverage.id">
              <label>
                <input
                  type="radio"
                  name="drink"
                  :id="beverage.id"
                  :value="beverage.id"
                  v-model="store.currentBase"
                />
                {{ beverage.name }}
              </label>
            </template>
          </li>

       
          <li>
            <h3>Creamer</h3>
            <template v-for="creamer in store.creamers" :key="creamer.id">
              <label>
                <input
                  type="radio"
                  name="creamer"
                  :id="creamer.id"
                  :value="creamer.id"
                  v-model="store.currentCreamer"
                />
                {{ creamer.name }}
              </label>
            </template>
          </li>

         
          <li>
            <h3>Syrup</h3>
            <template v-for="syrup in store.syrups" :key="syrup.id">
              <label>
                <input
                  type="radio"
                  name="syrup"
                  :id="syrup.id"
                  :value="syrup.id"
                  v-model="store.currentSyrup"
                />
                {{ syrup.name }}
              </label>
            </template>
          </li>
        </ul>
      </div>

     
      <div id="beverage-container" v-if="store.beverages.length > 0">
        <h2>Saved Beverages</h2>
        <div class="saved-beverages">
          <div v-for="beverage in store.beverages" :key="beverage.id" class="beverage-item">
            <label>
              <input 
                type="radio" 
                name="saved-beverage"
                :id="beverage.id" 
                :value="beverage"
                @change="store.showBeverage(beverage)"
              />
              {{ beverage.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
import type { BeverageType } from './types/beverage';

const store = useBeverageStore();


const currentBeverageObject = computed((): BeverageType => {
 
  const base = store.bases.find(b => b.id === store.currentBase) || store.bases[0];
  const creamer = store.creamers.find(c => c.id === store.currentCreamer) || store.creamers[0];
  const syrup = store.syrups.find(s => s.id === store.currentSyrup) || store.syrups[0];
  
  return {
    id: '',
    name: store.beverageName || 'Preview',
    temp: store.currentTemp,
    base,
    creamer,
    syrup
  };
});
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
  margin: 0;
  padding: 20px;
}

#app {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loading {
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 40px;
}

.beverage-form {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
}

.name-input-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  
  label {
    color: black;
    font-weight: bold;
    font-size: 16px;
  }
  
  input[type="text"] {
    flex: 1;
    padding: 8px 12px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #634caf;
    }
  }
  
  .make-beverage-btn {
    padding: 8px 20px;
    background: #634caf;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
    
    &:hover {
      background: #7445a0;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
    h3 {
      color: white;
      margin-right: 15px;
      margin-bottom: 0;
      font-size: 16px;
      min-width: 120px;
    }
    
    label {
      display: inline-flex;
      align-items: center;
      color: #fff;
      margin-right: 15px;
      margin-bottom: 5px;
      cursor: pointer;
      
      input[type="radio"] {
        margin-right: 5px;
        cursor: pointer;
      }
      
      &:hover {
        color: #ffd89b;
      }
    }
  }
}

#beverage-container {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  
  h2 {
    color: #fff;
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .saved-beverages {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .beverage-item {
      label {
        display: flex;
        align-items: center;
        color: white;
        font-size: 16px;
        cursor: pointer;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        transition: background 0.3s;
        
        input[type="radio"] {
          margin-right: 10px;
          cursor: pointer;
        }
        
        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
}
</style>
