const isProduction = process.env.CASHFREE_ENV === "production";

export const cashfreeConfig = {
  clientId: process.env.CASHFREE_CLIENT_ID!,
  clientSecret: process.env.CASHFREE_CLIENT_SECRET!,


  baseUrl: isProduction
    ? "https://api.cashfree.com"
    : "https://sandbox.cashfree.com",

};