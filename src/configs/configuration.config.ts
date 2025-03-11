export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: number;
}
export const database_config = () => ({
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
});
export const server_config = () => ({
  server: {
    port: process.env.PORT,
  },
});
