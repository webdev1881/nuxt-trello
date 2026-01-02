<script lang="ts" setup>
import { useSignin } from "~/composables/useSignin";

const { t } = useI18n();

useHead({
  title: t('auth.signin.title'),
});

const { formState, isLoading, validationSchema, handleSubmit } = useSignin();
</script>
<template>
  <WrapperAuth :title="$t('auth.signin.title')">
    <template #header>
      <span class="text-sm mr-px">{{ $t('auth.signin.noAccount') }}</span>
      <NuxtLink to="/auth/signup" class="text-primary-500"> {{ $t('auth.signin.signup') }} </NuxtLink>
    </template>

    <UForm :state="formState" :schema="validationSchema" @submit="handleSubmit">
      <UFormGroup class="mb-4" name="email" :label="$t('auth.signin.email')">
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="john@email.com"
        />
      </UFormGroup>
      <UFormGroup class="mb-4" name="password" :label="$t('auth.signin.password')">
        <UInput
          v-model="formState.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup>
        <UButton :loading="isLoading" type="submit" color="primary" block>
          {{ $t('auth.signin.button') }}
        </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
