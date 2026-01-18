# Локализация (i18n)

Проект использует простой плагин локализации с поддержкой украинского (по умолчанию) и английского языков.

## Использование

### В компонентах

```vue
<script setup>
const { $t } = useNuxtApp()
</script>

<template>
  <h1>{{ $t('welcomeBack') }}</h1>
  <button>{{ $t('signIn') }}</button>
</template>
```

### Смена языка

```typescript
const { $setLocale } = useNuxtApp()

// Сменить на украинский
$setLocale('uk')

// Сменить на английский
$setLocale('en')
```

### Проверка текущего языка

```typescript
const { $locale } = useNuxtApp()

console.log($locale.value) // 'uk' или 'en'
```

## Компонент переключателя языка

Используйте компонент `<LocaleSwitcher />` в любом месте приложения:

```vue
<template>
  <div>
    <LocaleSwitcher />
  </div>
</template>
```

## Доступные ключи перевода

### Аутентификация
- `signIn` - Увійти / Sign In
- `signUp` - Зареєструватися / Sign Up
- `signOut` - Вийти / Sign Out
- `email` - Електронна пошта / Email
- `password` - Пароль / Password
- `name` - Ім'я / Name
- `alreadyHaveAccount` - Вже є акаунт? / Already have an account?
- `dontHaveAccount` - Немає акаунту? / Don't have an account?
- `welcomeBack` - Ласкаво просимо назад! / Welcome Back!
- `createYourAccount` - Створіть свій акаунт / Create Your Account

### Доски
- `board` - Дошка / Board
- `boards` - Дошки / Boards
- `createBoard` - Створити дошку / Create Board
- `updateBoard` - Оновити дошку / Update Board
- `deleteBoard` - Видалити дошку / Delete Board
- `boardName` - Назва дошки / Board Name
- `selectCoverImage` - Виберіть обкладинку / Select cover image
- `noBoardsYet` - У вас ще немає дошок / You don't have any boards yet
- `createYourFirstBoard` - Створіть свою першу дошку / Create your first board

### Списки
- `list` - Список / List
- `lists` - Списки / Lists
- `createList` - Створити список / Create List
- `updateList` - Оновити список / Update List
- `deleteList` - Видалити список / Delete List
- `listName` - Назва списку / List Name
- `addList` - Додати список / Add List
- `addAnotherList` - Додати ще один список / Add another list

### Картки
- `card` - Картка / Card
- `cards` - Картки / Cards
- `createCard` - Створити картку / Create Card
- `updateCard` - Оновити картку / Update Card
- `deleteCard` - Видалити картку / Delete Card
- `cardTitle` - Назва картки / Card Title
- `cardDescription` - Опис картки / Card Description
- `addCard` - Додати картку / Add Card
- `addAnotherCard` - Додати ще одну картку / Add another card

### Общие
- `save` - Зберегти / Save
- `cancel` - Скасувати / Cancel
- `delete` - Видалити / Delete
- `edit` - Редагувати / Edit
- `create` - Створити / Create
- `update` - Оновити / Update
- `close` - Закрити / Close
- `loading` - Завантаження... / Loading...
- `search` - Пошук / Search
- `actions` - Дії / Actions
- `confirm` - Підтвердити / Confirm

### Toast сообщения
- `accountCreated` - Акаунт створено / Account created
- `accountCreatedDescription` - Ваш акаунт успішно створено... / Your account has been created...
- `boardCreated` - Дошку створено / Board created
- `boardCreatedDescription` - Ваша дошка була успішно створена / Your board has been created successfully
- `boardUpdated` - Дошку оновлено / Board updated
- `boardUpdatedDescription` - Ваша дошка була успішно оновлена / Your board has been updated successfully
- `boardDeleted` - Дошку видалено / Board deleted
- `boardDeletedDescription` - Дошка була успішно видалена / Board has been deleted successfully
- `listCreated` - Список створено / List created
- `listCreatedDescription` - Список було успішно створено / List has been created successfully
- `listUpdated` - Список оновлено / List updated
- `listUpdatedDescription` - Список було успішно оновлено / List has been updated successfully
- `listDeleted` - Список видалено / List deleted
- `listDeletedDescription` - Список було успішно видалено / List has been deleted successfully
- `cardCreated` - Картку створено / Card created
- `cardCreatedDescription` - Картку було успішно створено / Card has been created successfully
- `cardUpdated` - Картку оновлено / Card updated
- `cardUpdatedDescription` - Картку було успішно оновлено / Card has been updated successfully
- `cardDeleted` - Картку видалено / Card deleted
- `cardDeletedDescription` - Картку було успішно видалено / Card has been deleted successfully
- `error` - Помилка / Error
- `success` - Успіх / Success
- `warning` - Попередження / Warning
- `info` - Інформація / Information

### Ошибки
- `somethingWentWrong` - Щось пішло не так / Something went wrong
- `pleaseLogin` - Будь ласка, увійдіть в систему / Please login
- `invalidCredentials` - Невірні облікові дані / Invalid credentials
- `emailAlreadyExists` - Email вже існує / Email already exists
- `requiredField` - Обов'язкове поле / Required field

### Плейсхолдеры
- `enterBoardName` - Введіть назву дошки / Enter board name
- `enterListName` - Введіть назву списку / Enter list name
- `enterCardTitle` - Введіть назву картки / Enter card title
- `enterDescription` - Введіть опис / Enter description
- `searchPlaceholder` - Почніть вводити для пошуку... / Start typing to search...

## Добавление новых переводов

Отредактируйте файл `plugins/i18n.ts` и добавьте новые ключи в объекты `uk` и `en`:

```typescript
const messages = {
  uk: {
    myNewKey: 'Мій новий переклад',
  },
  en: {
    myNewKey: 'My new translation',
  },
}
```

## Вложенные ключи

Плагин поддерживает вложенные ключи через точку:

```typescript
const messages = {
  uk: {
    auth: {
      login: {
        title: 'Вхід в систему'
      }
    }
  }
}

// Использование
$t('auth.login.title') // 'Вхід в систему'
```
