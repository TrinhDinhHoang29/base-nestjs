export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: number;
}
export interface JwtConfig {
  secret: string;
  expiresIn: string;
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
export const jwt_config = () => {
  {
    process.env.SECRET;
    process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;
  }
};
