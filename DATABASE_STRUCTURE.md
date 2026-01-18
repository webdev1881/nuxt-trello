# Структура базы данных

## Иерархия моделей

```
User (Користувач)
  └── Board (Дошка)
       └── List (Список)
            └── Card (Картка)
```

---

## 1. User (Користувач)

**Коллекция**: `users`
**Файл**: `server/models/User.ts`

### Поля:

| Поле | Тип | Описание | Обязательное |
|------|-----|----------|--------------|
| `_id` | ObjectId | Унікальний ідентифікатор | ✅ (auto) |
| `name` | String | Ім'я користувача | ✅ |
| `email` | String | Email (унікальний) | ✅ |
| `password` | String | Хеш пароля (bcrypt) | ✅ |
| `createdAt` | Date | Дата створення | ✅ (auto) |
| `updatedAt` | Date | Дата оновлення | ✅ (auto) |

### Методы:

- `comparePassword(password: string)` - Порівняння пароля з хешем

### Особенности:

- Пароль автоматично хешується перед збереженням (pre-save hook)
- Email має бути унікальним
- Підтримка timestamps (createdAt, updatedAt)

### Пример документа:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Іван Петренко",
  "email": "ivan@example.com",
  "password": "$2a$10$...", // bcrypt hash
  "createdAt": "2026-01-03T10:00:00.000Z",
  "updatedAt": "2026-01-03T10:00:00.000Z"
}
```

---

## 2. Board (Дошка)

**Коллекция**: `boards`
**Файл**: `server/models/Board.ts`

### Поля:

| Поле | Тип | Описание | Обязательное | По умолчанию |
|------|-----|----------|--------------|--------------|
| `_id` | ObjectId | Унікальний ідентифікатор | ✅ (auto) | - |
| `name` | String | Назва дошки | ❌ | "Untitled Board" |
| `lists` | ObjectId[] | Масив ID списків | ❌ | [] |
| `owner` | ObjectId | ID власника (User) | ✅ | - |
| `coverImage` | String | URL обкладинки | ❌ | null |
| `createdAt` | Date | Дата створення | ✅ (auto) | - |
| `updatedAt` | Date | Дата оновлення | ✅ (auto) | - |

### Связи:

- `owner` → `User._id` (ref: "User")
- `lists` → `List._id[]` (ref: "List")

### Пример документа:

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Мій проект",
  "lists": [
    "507f1f77bcf86cd799439013",
    "507f1f77bcf86cd799439014"
  ],
  "owner": "507f1f77bcf86cd799439011",
  "coverImage": "https://example.com/image.jpg",
  "createdAt": "2026-01-03T10:00:00.000Z",
  "updatedAt": "2026-01-03T10:00:00.000Z"
}
```

---

## 3. List (Список)

**Коллекция**: `lists`
**Файл**: `server/models/List.ts`

### Поля:

| Поле | Тип | Описание | Обязательное | По умолчанию |
|------|-----|----------|--------------|--------------|
| `_id` | ObjectId | Унікальний ідентифікатор | ✅ (auto) | - |
| `name` | String | Назва списку | ✅ | - |
| `cards` | ObjectId[] | Масив ID карток | ❌ | [] |
| `board` | ObjectId | ID дошки | ✅ | - |
| `owner` | ObjectId | ID власника (User) | ✅ | - |
| `createdAt` | Date | Дата створення | ✅ (auto) | - |
| `updatedAt` | Date | Дата оновлення | ✅ (auto) | - |

### Связи:

- `owner` → `User._id` (ref: "User")
- `board` → `Board._id` (ref: "Board")
- `cards` → `Card._id[]` (ref: "Card")

### Пример документа:

```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "To Do",
  "cards": [
    "507f1f77bcf86cd799439015",
    "507f1f77bcf86cd799439016"
  ],
  "board": "507f1f77bcf86cd799439012",
  "owner": "507f1f77bcf86cd799439011",
  "createdAt": "2026-01-03T10:00:00.000Z",
  "updatedAt": "2026-01-03T10:00:00.000Z"
}
```

---

## 4. Card (Картка)

**Коллекция**: `cards`
**Файл**: `server/models/Card.ts`

### Поля:

| Поле | Тип | Описание | Обязательное | По умолчанию |
|------|-----|----------|--------------|--------------|
| `_id` | ObjectId | Унікальний ідентифікатор | ✅ (auto) | - |
| `title` | String | Заголовок картки | ✅ | - |
| `description` | String | Опис картки | ❌ | null |
| `owner` | ObjectId | ID власника (User) | ✅ | - |
| `list` | ObjectId | ID списку | ✅ | - |
| `createdAt` | Date | Дата створення | ✅ (auto) | - |
| `updatedAt` | Date | Дата оновлення | ✅ (auto) | - |

### Связи:

- `owner` → `User._id` (ref: "User")
- `list` → `List._id` (ref: "List")

### Пример документа:

```json
{
  "_id": "507f1f77bcf86cd799439015",
  "title": "Виправити помилку",
  "description": "<p>Деталі завдання...</p>",
  "owner": "507f1f77bcf86cd799439011",
  "list": "507f1f77bcf86cd799439013",
  "createdAt": "2026-01-03T10:00:00.000Z",
  "updatedAt": "2026-01-03T10:00:00.000Z"
}
```

---

## Связи между коллекциями

```
┌─────────────────┐
│     User        │
│  _id (507...11) │
└────────┬────────┘
         │ owner
         │
┌────────▼────────┐
│     Board       │
│  _id (507...12) │
│  owner: 507...11│
│  lists: [...]   │
└────────┬────────┘
         │ board
         │
┌────────▼────────┐
│      List       │
│  _id (507...13) │
│  board: 507...12│
│  owner: 507...11│
│  cards: [...]   │
└────────┬────────┘
         │ list
         │
┌────────▼────────┐
│      Card       │
│  _id (507...15) │
│  list: 507...13 │
│  owner: 507...11│
└─────────────────┘
```

---

## Индексы

### User
- `email` - унікальний індекс

### Board
- `owner` - індекс для швидкого пошуку дошок користувача

### List
- `board` - індекс для швидкого пошуку списків на дошці
- `owner` - індекс для швидкого пошуку списків користувача

### Card
- `list` - індекс для швидкого пошуку карток у списку
- `owner` - індекс для швидкого пошуку карток користувача

---

## База данных

**Название БД**: `nrello`
**URI**: `mongodb://localhost:27017/nrello`
**ORM**: Mongoose

---

## Cascade Delete

⚠️ **Важливо**: При видаленні батьківських сутностей необхідно вручну видаляти дочірні:

- При видаленні **Board** → видалити всі **Lists** та **Cards**
- При видаленні **List** → видалити всі **Cards**
- При видаленні **User** → видалити всі **Boards**, **Lists**, **Cards**

---

## Типы данных TypeScript

```typescript
// User
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

// Board
interface BoardDocument extends Document {
  name: string;
  lists: string[] | ListDocument[];
  owner: string;
  coverImage: string;
}

// List
interface ListDocument extends Document {
  name: string;
  cards: string[];
  board: string;
  owner: string;
}

// Card
interface CardDocument extends Document {
  title: string;
  description: string;
  owner: string;
  list: string;
}
```
