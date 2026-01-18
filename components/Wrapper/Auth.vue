<script lang="ts" setup>
defineProps({
  title: {
    type: String,
  },
});
</script>
<template>
  <div class="grid lg:grid-cols-2 h-screen bg-gray-100 dark:bg-gray-950">
    <div
      class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52"
    >
      <div class="flex justify-end mb-4">
        <LocaleSwitcher />
      </div>
      <div class="header text-center mb-6">
        <div class="flex justify-center my-4"><Logo /></div>
        <h1 class="text-xl font-bold mb-px">{{ title }}</h1>
        <slot name="header"></slot>
      </div>
      <UCard>
        <slot />
      </UCard>
    </div>
    <div class="right hidden lg:block"></div>
  </div>
</template>

<style>
.right {
  background: linear-gradient(-45deg, #2232c5, #1021b9, #1616cc, #2341d5);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
