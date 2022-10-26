export default {
  secret_token: process.env.JWT_KEY,
  secret_refresh_token: process.env.REFRESH_TOKEN_KEY,
  expires_in_token: process.env.JWT_EXPIRES_IN,
  expires_in_refresh_token: process.env.EXPIRES_IN_REFRESH_TOKEN,
  expires_in_refresh_token_days: Number(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS),
};
