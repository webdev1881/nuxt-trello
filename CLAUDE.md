# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nuxt Trello (nrello) is a full-stack SaaS task management application built with Nuxt 3, MongoDB, and Stripe for subscriptions. It provides Trello-like functionality with boards, lists, and cards, plus drag-and-drop interfaces and premium subscription tiers.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Environment Configuration

Required environment variables (see `.env.example`):

- `MONGODB_URI` - MongoDB connection string
- `AUTH_SECRET` - Secret for JWT signing
- `AUTH_ORIGIN` - Application URL (e.g., http://localhost:3000)
- `STRIPE_PRICE_ID` - Stripe price ID for subscriptions
- `STRIPE_PUBLIC_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `PIXABAY_API_KEY` - Pixabay API key for board cover images

## Architecture

### Data Model Hierarchy

```
User
  └── Board (one-to-many)
       └── List (one-to-many)
            └── Card (one-to-many)
```

### Core Models (server/models/)

- **User**: Authentication, password hashing (bcryptjs), Stripe integration with subscription tracking
  - Virtual property: `hasActiveSubscription` (checks for "active" or "trialing" status)
  - Methods: `comparePassword()`, `updateSubscription()`
- **Board**: Contains lists, has owner reference, optional cover image
- **List**: Contains cards, belongs to board and owner
- **Card**: Has title/description, belongs to list and owner

### Authentication Flow

- Uses `@sidebase/nuxt-auth` with NextAuth.js 4.21.1
- Credentials-based authentication with JWT sessions
- Auth handler: `server/api/auth/[...].ts`
- Protected routes enforced via `server/middleware/1.auth.ts.ts`
  - Protected: `/api/boards`, `/api/lists`, `/api/users`
- Sign-in page: `pages/auth/signin.vue`
- User context available in event handlers as `event.context.user`

### API Structure

RESTful API endpoints follow these patterns:

- `GET /api/boards` - List all boards for user
- `POST /api/boards` - Create new board
- `GET /api/boards/[boardId]` - Get single board
- `PUT /api/boards/[boardId]` - Update board
- `DELETE /api/boards/[boardId]` - Delete board
- `POST /api/lists` - Create list
- `PUT /api/lists/[listId]` - Update list
- `DELETE /api/lists/[listId]` - Delete list
- `GET /api/lists/[listId]/cards` - List cards in list
- `POST /api/lists/[listId]/cards` - Create card
- `PUT /api/lists/[listId]/cards/[cardId]` - Update card
- `DELETE /api/lists/[listId]/cards/[cardId]` - Delete card

### SaaS/Subscription Features

- **Subscription handling**: `composables/useSubscription.ts`
  - `showSubscriptionModal()` - Display upgrade prompt
  - `subscribe()` - Initiate Stripe checkout
  - `accessPortal()` - Redirect to Stripe customer portal
- **Stripe integration**:
  - `POST /api/users/subscribe` - Create checkout session
  - `GET /api/users/access-portal` - Generate portal link
  - `POST /api/webhooks/stripe` - Handle Stripe webhooks for subscription updates
- Premium features gated by `user.hasActiveSubscription`

### Composables

Resource-specific composables in `composables/`:
- `useBoard.ts` - Board CRUD operations
- `useList.ts` - List management
- `useCard.ts` - Card operations
- `useSignin.ts` - Authentication flows
- `useSubscription.ts` - Subscription management

### Validation

Zod schemas for request validation in `schemas/`:
- `Board.schema.ts`
- `List.schema.ts`
- `Card.schema.ts`
- `Signin.schema.ts`
- `Signup.schema.ts`

Use with `h3-zod` for server-side validation in API routes.

### Key Dependencies

- **UI**: `@nuxt/ui` - Nuxt UI component library
- **Database**: Mongoose for MongoDB ORM
- **Auth**: `@sidebase/nuxt-auth` + NextAuth.js 4.21.1
- **Payment**: Stripe + @stripe/stripe-js
- **Drag & Drop**: vuedraggable (v4)
- **Rich Text**: @vueup/vue-quill
- **Images**: @nuxt/image, Pixabay API for cover images

### Component Organization

- `components/Board/` - Board-specific components
- `components/Form/` - Form components for Board, List, Card
- `components/List/` - List and list-item components
- `components/Wrapper/` - Layout wrappers (Auth, Default)
- `components/ImagePicker.vue` - Cover image selection
- `components/SubscribeModal.vue` - Subscription upgrade modal

### Runtime Configuration

Configuration via `nuxt.config.ts`:
- Auth origin/secret from environment
- Stripe keys (public/secret/webhook)
- Pixabay API key
- MongoDB URI configured via `nuxtServerUtils.mongodbUri`

## Important Notes

- MongoDB connection handled by `nuxt-server-utils` module
- Password hashing uses bcryptjs with pre-save hook in User model
- Color mode preference defaults to "light"
- Nuxt devtools enabled in development
