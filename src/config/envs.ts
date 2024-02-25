import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  POSTGRES_URL: get('POSTGRES_URL').asString(),
  POSTGRES_USER: get('POSTGRES_USER').asString(),
  POSTGRES_DB: get('POSTGRES_DB').asString(),
  POSTGRES_PORT: get('POSTGRES_PORT').asString(),
  POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').asString(),
  NODE_ENV: get('NODE_ENV').asString(),
}
