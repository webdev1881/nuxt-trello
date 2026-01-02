<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "h3-zod";
import SignupSchema from "~/schemas/Signup.schema";

const { t } = useI18n();

useHead({
  title: t('auth.signup.title'),
});

const formState = ref({
  name: undefined,
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
});

const isLoading = ref(false);

async function handleSubmit(
  event: FormSubmitEvent<z.output<typeof SignupSchema>>
) {
  try {
    isLoading.value = true;
    await useFetch("/api/auth/signup", {
      method: "POST",
      body: event.data,
    });
    useToast().add({
      title: t('auth.signup.success'),
      description: t('auth.signup.success'),
    });
    await useRouter().push({
      name: "auth-signin",
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <WrapperAuth :title="$t('auth.signup.title')">
    <template #header>
      <span class="text-sm mr-px">{{ $t('auth.signup.hasAccount') }}</span>
      <NuxtLink to="/auth/signin" class="text-primary-500"> {{ $t('auth.signup.signin') }} </NuxtLink>
    </template>

    <UForm :state="formState" :schema="SignupSchema" @submit="handleSubmit">
      <UFormGroup class="mb-4" name="name" :label="$t('auth.signup.name')">
        <UInput v-model="formState.name" type="text" placeholder="John Doe" />
      </UFormGroup>

      <UFormGroup class="mb-4" name="email" :label="$t('auth.signup.email')">
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="john@email.com"
        />
      </UFormGroup>
      <UFormGroup class="mb-4" name="password" :label="$t('auth.signup.password')">
        <UInput
          v-model="formState.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup class="mb-4" name="passwordConfirm" :label="$t('auth.signup.password')">
        <UInput
          v-model="formState.passwordConfirm"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup>
        <UButton :loading="isLoading" type="submit" color="primary" block>
          {{ $t('auth.signup.button') }}
        </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
