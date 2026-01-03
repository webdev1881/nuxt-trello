# Subscription Feature - Rollback Instructions

## Current Status
Subscription functionality has been **DISABLED** but can be easily restored.

## What Was Changed

### 1. Environment Variables (`.env`)
- Stripe-related variables are commented out
- Only MongoDB and Auth variables are active

### 2. Code Changes
All changes are marked with `SUBSCRIPTION_DISABLED` comment:

**Files Modified:**
- `components/Form/Board.vue` - Subscription modal call commented out (lines 48-58)
- `utils/stripe.ts` - Entire Stripe integration commented out

## How to Re-enable Subscriptions

### Step 1: Update Environment Variables
Edit `.env` file and uncomment Stripe variables:

```bash
# Uncomment these lines:
STRIPE_PRICE_ID=price_xxxxxxxxxxxxxx
STRIPE_PUBLIC_KEY=pk_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_xxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

Replace the `xxxxxx` with your actual Stripe keys from https://dashboard.stripe.com/

### Step 2: Restore Code

#### 2.1. Restore `utils/stripe.ts`
Uncomment all code in the file (remove `/*` and `*/`)

#### 2.2. Restore `components/Form/Board.vue`
Find the section with `SUBSCRIPTION_DISABLED` comment (around line 48) and uncomment:

```typescript
if (error.value) {
  if (error.value.statusCode === 403) {
    useSubscription().showSubscriptionModal({
      title: "Multiple boards is a Premium Feature",
      description:
        "You can create only one board in free plan. Please upgrade to premium to create more boards.",
    });
  }
}
```

### Step 3: Create Missing Files

You'll need to create `composables/useSubscription.ts` with subscription logic.
Check the CLAUDE.md for reference on what this composable should contain.

### Step 4: Add Subscription Fields to User Model

Edit `server/models/User.ts` to add Stripe customer fields:

```typescript
stripeCustomerId: String,
stripeSubscriptionId: String,
stripeSubscriptionStatus: String,
```

And add the virtual property `hasActiveSubscription`.

### Step 5: Create API Routes

Create these files:
- `server/api/users/subscribe.post.ts` - Create Stripe checkout session
- `server/api/users/access-portal.get.ts` - Generate Stripe portal link
- `server/api/webhooks/stripe.post.ts` - Handle Stripe webhooks

### Step 6: Update Runtime Config

Edit `nuxt.config.ts` and add Stripe keys to `runtimeConfig`:

```typescript
runtimeConfig: {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  public: {
    stripePriceId: process.env.STRIPE_PRICE_ID,
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
  }
}
```

### Step 7: Restart Server

```bash
npm run dev
```

## Quick Search
To find all disabled subscription code, search for: `SUBSCRIPTION_DISABLED`

## Need Help?
Check the original CLAUDE.md file for full architecture details about the subscription system.
