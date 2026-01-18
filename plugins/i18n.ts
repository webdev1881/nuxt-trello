export default defineNuxtPlugin(() => {
  const locale = useState<'uk' | 'en'>('locale', () => 'uk')

  const messages = {
    uk: {
      // Auth
      signIn: 'Увійти',
      signUp: 'Зареєструватися',
      signOut: 'Вийти',
      email: 'Електронна пошта',
      password: 'Пароль',
      name: 'Ім\'я',
      alreadyHaveAccount: 'Вже є акаунт?',
      dontHaveAccount: 'Немає акаунту?',

      // Board
      board: 'Дошка',
      boards: 'Дошки',
      createBoard: 'Створити дошку',
      updateBoard: 'Оновити дошку',
      deleteBoard: 'Видалити дошку',
      boardName: 'Назва дошки',
      selectCoverImage: 'Виберіть обкладинку',

      // List
      list: 'Список',
      lists: 'Списки',
      createList: 'Створити список',
      updateList: 'Оновити список',
      deleteList: 'Видалити список',
      listName: 'Назва списку',
      addList: 'Додати список',

      // Card
      card: 'Картка',
      cards: 'Картки',
      createCard: 'Створити картку',
      updateCard: 'Оновити картку',
      deleteCard: 'Видалити картку',
      cardTitle: 'Назва картки',
      cardDescription: 'Опис картки',
      addCard: 'Додати картку',

      // Common
      save: 'Зберегти',
      cancel: 'Скасувати',
      delete: 'Видалити',
      edit: 'Редагувати',
      create: 'Створити',
      update: 'Оновити',
      close: 'Закрити',
      loading: 'Завантаження...',
      search: 'Пошук',

      // Messages
      welcomeBack: 'Ласкаво просимо назад!',
      createYourAccount: 'Створіть свій акаунт',
    },
    en: {
      // Auth
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',

      // Board
      board: 'Board',
      boards: 'Boards',
      createBoard: 'Create Board',
      updateBoard: 'Update Board',
      deleteBoard: 'Delete Board',
      boardName: 'Board Name',
      selectCoverImage: 'Select cover image',

      // List
      list: 'List',
      lists: 'Lists',
      createList: 'Create List',
      updateList: 'Update List',
      deleteList: 'Delete List',
      listName: 'List Name',
      addList: 'Add List',

      // Card
      card: 'Card',
      cards: 'Cards',
      createCard: 'Create Card',
      updateCard: 'Update Card',
      deleteCard: 'Delete Card',
      cardTitle: 'Card Title',
      cardDescription: 'Card Description',
      addCard: 'Add Card',

      // Common
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      update: 'Update',
      close: 'Close',
      loading: 'Loading...',
      search: 'Search',

      // Messages
      welcomeBack: 'Welcome Back!',
      createYourAccount: 'Create Your Account',
    },
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages[locale.value]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  const setLocale = (newLocale: 'uk' | 'en') => {
    locale.value = newLocale
  }

  return {
    provide: {
      t,
      locale,
      setLocale,
    },
  }
})
