export default defineNuxtPlugin({
  name: 'i18n',
  enforce: 'pre',
  setup() {
    const locale = useState<'uk' | 'en'>('locale', () => 'uk')

    const messages = {
    uk: {
      // Auth
      signIn: 'Увійти',
      signUp: 'Зареєструватися',
      signed: 'Користувач',
      signOut: 'Вийти',
      email: 'Електронна пошта',
      password: 'Пароль',
      name: 'Ім\'я',
      alreadyHaveAccount: 'Вже є акаунт?',
      dontHaveAccount: 'Немає акаунту?',
      welcomeBack: 'Ласкаво просимо назад!',
      createYourAccount: 'Створіть свій акаунт',

      // Board
      board: 'Дошка',
      boards: 'Дошки',
      createBoard: 'Створити дошку',
      createNewBoard: 'Створити нову дошку',
      updateBoard: 'Оновити дошку',
      deleteBoard: 'Видалити дошку',
      boardName: 'Назва дошки',
      selectCoverImage: 'Виберіть обкладинку',
      noBoardsYet: 'У вас ще немає дошок',
      createYourFirstBoard: 'Створіть свою першу дошку',

      // List
      list: 'Список',
      lists: 'Списки',
      createList: 'Створити список',
      updateList: 'Оновити список',
      deleteList: 'Видалити список',
      listName: 'Назва списку',
      addList: 'Додати список',
      addAnotherList: 'Додати ще один список',

      // Card
      card: 'Задача',
      cards: 'Задачі',
      createCard: 'Створити задачу',
      updateCard: 'Оновити задачу',
      deleteCard: 'Видалити задачу',
      cardTitle: 'Назва задачі',
      cardDescription: 'Опис задачі',
      addCard: 'Додати задачу',
      addAnotherCard: 'Додати ще одну задачу',

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
      actions: 'Дії',
      confirm: 'Підтвердити',

      // Toast messages
      accountCreated: 'Акаунт створено',
      accountCreatedDescription: 'Ваш акаунт успішно створено. Перенаправлення на сторінку входу',
      boardCreated: 'Дошку створено',
      boardCreatedDescription: 'Ваша дошка була успішно створена',
      boardUpdated: 'Дошку оновлено',
      boardUpdatedDescription: 'Ваша дошка була успішно оновлена',
      boardDeleted: 'Дошку видалено',
      boardDeletedDescription: 'Дошка була успішно видалена',
      listCreated: 'Список створено',
      listCreatedDescription: 'Список було успішно створено',
      listUpdated: 'Список оновлено',
      listUpdatedDescription: 'Список було успішно оновлено',
      listDeleted: 'Список видалено',
      listDeletedDescription: 'Список було успішно видалено',
      cardCreated: 'Картку створено',
      cardCreatedDescription: 'Картку було успішно створено',
      cardUpdated: 'Картку оновлено',
      cardUpdatedDescription: 'Картку було успішно оновлено',
      cardDeleted: 'Картку видалено',
      cardDeletedDescription: 'Картку було успішно видалено',
      error: 'Помилка',
      success: 'Успіх',
      warning: 'Попередження',
      info: 'Інформація',

      // Errors
      somethingWentWrong: 'Щось пішло не так',
      pleaseLogin: 'Будь ласка, увійдіть в систему',
      invalidCredentials: 'Невірні облікові дані',
      emailAlreadyExists: 'Email вже існує',
      requiredField: 'Обов\'язкове поле',

      // Placeholders
      enterBoardName: 'Введіть назву дошки',
      enterListName: 'Введіть назву списку',
      enterCardTitle: 'Введіть назву картки',
      enterDescription: 'Введіть опис',
      searchPlaceholder: 'Почніть вводити для пошуку...',
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
      welcomeBack: 'Welcome Back!',
      createYourAccount: 'Create Your Account',

      // Board
      board: 'Board',
      boards: 'Boards',
      createBoard: 'Create Board',
      updateBoard: 'Update Board',
      deleteBoard: 'Delete Board',
      boardName: 'Board Name',
      selectCoverImage: 'Select cover image',
      noBoardsYet: 'You don\'t have any boards yet',
      createYourFirstBoard: 'Create your first board',

      // List
      list: 'List',
      lists: 'Lists',
      createList: 'Create List',
      updateList: 'Update List',
      deleteList: 'Delete List',
      listName: 'List Name',
      addList: 'Add List',
      addAnotherList: 'Add another list',

      // Card
      card: 'Card',
      cards: 'Cards',
      createCard: 'Create Card',
      updateCard: 'Update Card',
      deleteCard: 'Delete Card',
      cardTitle: 'Card Title',
      cardDescription: 'Card Description',
      addCard: 'Add Card',
      addAnotherCard: 'Add another card',

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
      actions: 'Actions',
      confirm: 'Confirm',

      // Toast messages
      accountCreated: 'Account created',
      accountCreatedDescription: 'Your account has been created successfully. Redirecting to sign in page',
      boardCreated: 'Board created',
      boardCreatedDescription: 'Your board has been created successfully',
      boardUpdated: 'Board updated',
      boardUpdatedDescription: 'Your board has been updated successfully',
      boardDeleted: 'Board deleted',
      boardDeletedDescription: 'Board has been deleted successfully',
      listCreated: 'List created',
      listCreatedDescription: 'List has been created successfully',
      listUpdated: 'List updated',
      listUpdatedDescription: 'List has been updated successfully',
      listDeleted: 'List deleted',
      listDeletedDescription: 'List has been deleted successfully',
      cardCreated: 'Card created',
      cardCreatedDescription: 'Card has been created successfully',
      cardUpdated: 'Card updated',
      cardUpdatedDescription: 'Card has been updated successfully',
      cardDeleted: 'Card deleted',
      cardDeletedDescription: 'Card has been deleted successfully',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',

      // Errors
      somethingWentWrong: 'Something went wrong',
      pleaseLogin: 'Please login',
      invalidCredentials: 'Invalid credentials',
      emailAlreadyExists: 'Email already exists',
      requiredField: 'Required field',

      // Placeholders
      enterBoardName: 'Enter board name',
      enterListName: 'Enter list name',
      enterCardTitle: 'Enter card title',
      enterDescription: 'Enter description',
      searchPlaceholder: 'Start typing to search...',
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
  }
})
