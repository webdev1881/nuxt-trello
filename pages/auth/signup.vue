<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "h3-zod";
import SignupSchema from "~/schemas/Signup.schema";

const { $t } = useNuxtApp()

useHead({
  title: "Signup",
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
      title: $t('accountCreated'),
      description: $t('accountCreatedDescription'),
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
  <WrapperAuth :title="$t('createYourAccount')">
    <template #header>
      <span class="text-sm mr-px">{{ $t('alreadyHaveAccount') }}</span>
      <NuxtLink to="/auth/signin" class="text-primary-500"> {{ $t('signIn') }} </NuxtLink>
    </template>

    <UForm :state="formState" :schema="SignupSchema" @submit="handleSubmit">
      <UFormGroup class="mb-4" name="name" :label="$t('name')">
        <UInput v-model="formState.name" type="text" placeholder="John Doe" />
      </UFormGroup>

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
      <UFormGroup class="mb-4" name="passwordConfirm" :label="$t('password')">
        <UInput
          v-model="formState.passwordConfirm"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup>
        <UButton :loading="isLoading" type="submit" color="primary" block>
          {{ $t('signUp') }}
        </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
