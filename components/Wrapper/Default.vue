<script lang="ts" setup>
const { data, signOut } = useAuth();

const { t } = useI18n();

const dropdownItems = computed(() => [
  [
    {
      label: t('menu.profile'),
      slot: "profile",
      disabled: true,
    },
  ],
  [
    {
      label: t('menu.signout'),
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: handleSignout,
    },
  ],
]);

async function handleSignout() {
  await signOut();
}
</script>
<template>
  <div>
    <header class="p-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
      <UContainer>
        <div class="flex justify-between">
          <NuxtLink to="/"><Icon class="w-8 h-8" /></NuxtLink>

          <div class="inline-flex justify-end gap-4 items-center">
            <slot name="actions"></slot>

            <ColorSwitcher />
            <UDropdown :items="dropdownItems">
              <UIcon name="i-heroicons-user-circle" class="w-6 h-6" />

              <template #profile>
                <div class="text-left">
                  <p>{{ $t('menu.signedInAs') }}</p>
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ data?.user?.email }}
                  </p>
                </div>
              </template>
            </UDropdown>
          </div>
        </div>
      </UContainer>
    </header>

    <main class="my-4">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<style></style>
