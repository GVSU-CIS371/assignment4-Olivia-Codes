<template>
  <div class="syrup" :style="{ backgroundColor: syrup.color }"></div>
</template>

<script setup lang="ts">
import type { SyrupType } from '../types/beverage';

defineProps<{
  syrup: SyrupType;
}>();
</script>

<style lang="scss" scoped>
.syrup {
  transform: translateY(400%);
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 0.5s 0.25s forwards;
  z-index: 2;
}

@keyframes pour-tea {
  0% {
    transform: translateY(400%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
