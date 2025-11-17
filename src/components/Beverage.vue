<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />
    <Contents>
      <template v-slot:top>
        <Creamer v-if="hasCreamer" :creamer="beverage.creamer" :isIced="isIced" />
      </template>
      <template v-slot:mid>
        <Syrup v-if="hasSyrup" :syrup="beverage.syrup" />
      </template>
      <template v-slot:bottom>
        <Base 
          :drink="beverage.base" 
          :creamer="beverage.creamer" 
          :syrup="beverage.syrup"
          :hasCreamer="hasCreamer"
        />
      </template>
    </Contents>
  </Mug>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BeverageType } from '../types/beverage';
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";

type Props = {
  beverage: BeverageType;
};

const props = defineProps<Props>();

const isIced = computed(() => props.beverage.temp.toLowerCase() === 'cold');

const hasCreamer = computed(() => {
  return props.beverage.creamer.name !== 'No Cream';
});

const hasSyrup = computed(() => {
  return props.beverage.syrup.name !== 'No Syrup';
});
</script>
