<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return locales.value.filter((i) => typeof i !== 'string');
});
</script>

<template>
  <UDropdown
    :items="[
      availableLocales.map((loc) => ({
        label: loc.name,
        click: () => setLocale(loc.code),
        active: locale === loc.code,
      })),
    ]"
  >
    <UButton variant="ghost" size="sm">
      {{ locale.toUpperCase() }}
    </UButton>
  </UDropdown>
</template>
