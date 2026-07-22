/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_LIVENESS_API_BASE_URL: string
  readonly VITE_LIVENESS_API_KEY: string
  readonly VITE_EGOV_API_BASE_URL: string
  readonly VITE_EGOV_ACCESS_CODE: string
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
