export const useList = () => {
  const { t } = useI18n();

  async function destroy(id: string, onDestroy?: () => void) {
    try {
      useToast().add({
        title: t('list.delete'),
        description: t('list.deleteConfirm'),
        actions: [
          {
            label: t('common.cancel'),
            click: () => {},
          },
          {
            label: t('common.yes'),
            color: "red",
            click: async () => {
              await useFetch(`/api/lists/${id}`, {
                method: "DELETE",
              });
              onDestroy?.();
            },
          },
        ],
        timeout: 5000,
        color: "red",
      });
    } catch (e: any) {
      useToast().add({
        title: t('common.error'),
        description: e.message || t('errors.generic'),
      });
    }
  }

  async function update(id: string, data: Record<string, unknown>) {
    await useFetch(`/api/lists/${id}`, {
      body: data,
      method: "PUT",
      watch: false,
    });
  }

  return {
    destroy,
    update,
  };
};
