declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_USER: string;
      POSTGRES_DB: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_URL: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      JWT_SECRET_KEY: string;
      JWT_REFRESH_SECRET_KEY: string;
      JWT_ACCESS_TOKEN_EXPIRED: string;
      JWT_REFRESH_TOKEN_EXPIRED: string;
    }
  }
}

export {}
