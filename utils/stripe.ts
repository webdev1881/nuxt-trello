// SUBSCRIPTION_DISABLED: Stripe integration commented out
// To re-enable subscriptions:
// 1. Uncomment the code below
// 2. Add Stripe environment variables to .env (see .env file for instructions)
// 3. Uncomment subscription-related code throughout the app (search for SUBSCRIPTION_DISABLED)

/*
import Stripe from "stripe";

export default () => {
  const config = useRuntimeConfig();

  if (!config.stripeSecretKey) {
    throw createError({
      statusCode: 500,
      message: "Stripe secret key not found",
    });
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: "2023-10-16",
  });

  return stripe;
};
*/
