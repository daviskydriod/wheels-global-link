interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_HEALTH_PATH?: string;
  readonly VITE_ADMIN_API_KEY?: string;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
