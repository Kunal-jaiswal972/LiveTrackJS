declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_SECRET: string;
      DASHBOARD_CLIENT_URL: string;
      MONGODB_URL: string;
      REDIS_URL: string;
      GMAIL_USER: string;
      GMAIL_APP_PASSWORD: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
    }
  }
}

export {}
