declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_USER: string;
      POSTGRES_DB: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_URL: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
    }
  }
}

export {}
