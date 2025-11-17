<template>
  <div class="carafe">
    <slot name="top"></slot>
    <slot name="mid"></slot>
    <slot name="bottom"></slot>
  </div>
</template>

<style scoped>
.carafe {
  min-height: 96px;
  overflow: hidden;
  border-radius: 0.05em 0.05em 2.2em 2.2em;
  
  width: 100%;
  height: 100%;
}
</style>
