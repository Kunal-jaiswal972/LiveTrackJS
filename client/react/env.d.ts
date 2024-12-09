declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_SERVER_URL: string;
      VITE_API_KEY: string;
    }
  }
}

export {}
