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

### Доски
- `board` - Дошка / Board
- `boards` - Дошки / Boards
- `createBoard` - Створити дошку / Create Board
- `updateBoard` - Оновити дошку / Update Board
- `deleteBoard` - Видалити дошку / Delete Board
- `boardName` - Назва дошки / Board Name
- `selectCoverImage` - Виберіть обкладинку / Select cover image

### Списки
- `list` - Список / List
- `lists` - Списки / Lists
- `createList` - Створити список / Create List
- `updateList` - Оновити список / Update List
- `deleteList` - Видалити список / Delete List
- `listName` - Назва списку / List Name
- `addList` - Додати список / Add List

### Картки
- `card` - Картка / Card
- `cards` - Картки / Cards
- `createCard` - Створити картку / Create Card
- `updateCard` - Оновити картку / Update Card
- `deleteCard` - Видалити картку / Delete Card
- `cardTitle` - Назва картки / Card Title
- `cardDescription` - Опис картки / Card Description
- `addCard` - Додати картку / Add Card

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

### Сообщения
- `welcomeBack` - Ласкаво просимо назад! / Welcome Back!
- `createYourAccount` - Створіть свій акаунт / Create Your Account

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
