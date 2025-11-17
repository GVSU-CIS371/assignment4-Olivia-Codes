<template>
  <div class="baseBeverage" :style="{ backgroundColor: drink.color }"></div>
</template>

<script setup lang="ts">
import type { BaseBeverageType, CreamerType, SyrupType } from '../types/beverage';

defineProps<{
  drink: BaseBeverageType;
  creamer: CreamerType;
  syrup: SyrupType;
  hasCreamer: boolean;
}>();
</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  animation: pour-tea 0.5s;
  z-index: 1;
  overflow: hidden;
}

@keyframes pour-tea {
  0% {
    height: 0%;
  }
  100% {
    height: 100%;
  }
}
</style>

