<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board";

const { t } = useI18n();

definePageMeta({
  middleware: "auth",
});

useHead({
  title: t('board.title'),
});

const showCreateBoard = ref(false);
const selectedBoard = ref<BoardDocument | undefined>();

const { data, error, refresh } = await useFetch<BoardDocument[]>("/api/boards");
provide("refresh-boards", refresh);

if (error.value) {
  throw createError(error.value);
}

async function handleEdit(board: BoardDocument) {
  selectedBoard.value = board;
  showCreateBoard.value = true;
}

watchEffect(() => {
  if (!showCreateBoard.value) {
    selectedBoard.value = undefined;
  }
});
</script>
<template>
  <WrapperDefault>
    <h1 class="tex-3xl font-semibold">{{ $t('board.title') }}</h1>

    <template #actions>
      <UButton size="xs" @click="showCreateBoard = !showCreateBoard"
        >{{ $t('board.create') }}</UButton
      >
    </template>

    <!-- Sidesheet  -->
    <USlideover v-model="showCreateBoard">
      <SlideoverHeader
        :title="selectedBoard ? $t('board.edit') : $t('board.create')"
        :on-click="() => (showCreateBoard = false)"
      ></SlideoverHeader>

      <FormBoard
        :type="selectedBoard ? 'update' : 'create'"
        :initial-data="selectedBoard"
        :on-create="
          () => {
            showCreateBoard = false;
            refresh();
          }
        "
        :on-update="
          () => {
            showCreateBoard = false;
            selectedBoard = undefined;
            refresh();
          }
        "
      />
    </USlideover>
    <!-- ./ Sidesheet  -->

    <!-- List of boards -->
    <section class="grid grid-cols-2 lg:grid-cols-5 my-4 gap-4">
      <BoardCard
        v-for="board in data"
        :key="board._id"
        :board="board"
        :on-edit="handleEdit"
      ></BoardCard>
    </section>
    <!-- ./ List of boards -->
  </WrapperDefault>
</template>

<style></style>
