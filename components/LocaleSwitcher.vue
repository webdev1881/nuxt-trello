<script setup lang="ts">
const { $locale, $setLocale } = useNuxtApp()

const locales = [
  { value: 'uk', label: 'Українська', flag: '🇺🇦', click: () => $setLocale('uk') },
  { value: 'en', label: 'English', flag: '🇬🇧', click: () => $setLocale('en') },
]

const currentLocale = computed(() => {
  if (!$locale || !$locale.value) return locales[0]
  return locales.find(l => l.value === $locale.value) || locales[0]
})

const items = computed(() => [
  locales.map(locale => ({
    ...locale,
    label: `${locale.flag} ${locale.label}`,
  }))
])
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
    <UButton
      color="white"
      :label="currentLocale.flag + ' ' + currentLocale.label"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
  </UDropdown>
</template>
