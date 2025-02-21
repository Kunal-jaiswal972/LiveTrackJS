declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_PROD_SERVER_URL: string;
      VITE_DEV_SERVER_URL: string;
    }
  }
}

export {}
