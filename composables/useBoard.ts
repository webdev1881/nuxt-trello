export const useBoard = () => {
  const { t } = useI18n();

  async function destroy(id: string, onDestroy?: () => void) {
    try {
      useToast().add({
        title: t('board.delete'),
        description: t('board.deleteConfirm'),
        actions: [
          {
            label: t('common.cancel'),
            click: () => {},
          },
          {
            label: t('common.yes'),
            color: "red",
            click: async () => {
              await useFetch(`/api/boards/${id}`, {
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

  return {
    destroy,
  };
};
