<script lang="ts" setup>
import { useSignin } from "~/composables/useSignin";

const { $t } = useNuxtApp()

useHead({
  title: "Signin",
});

const { formState, isLoading, validationSchema, handleSubmit } = useSignin();
</script>
<template>
  <WrapperAuth :title="$t('welcomeBack')">
    <template #header>
      <span class="text-sm mr-px">{{ $t('dontHaveAccount') }}</span>
      <span>  &nbsp;</span>
      <NuxtLink to="/auth/signup" class="text-primary-500"> {{ $t('signUp') }} </NuxtLink>
    </template>

    <UForm :state="formState" :schema="validationSchema" @submit="handleSubmit">
      <UFormGroup class="mb-4" name="email" :label="$t('email')">
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="john@email.com"
        />
      </UFormGroup>
      <UFormGroup class="mb-4" name="password" :label="$t('password')">
        <UInput
          v-model="formState.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup>
        <UButton :loading="isLoading" type="submit" color="primary" block>
          {{ $t('signIn') }}
        </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
