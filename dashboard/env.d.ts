declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_SERVER_URL: string;
    }
  }
}

export {}
