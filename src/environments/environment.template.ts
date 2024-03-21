export const environment = {
  production: false,
  PLAY_GOLF_API_URL: "${PLAY_GOLF_API_URL:-http://localhost:4000}",
  JWT_ISSUER_URL: "${JWT_ISSUER_URL:-http://localhost:8100}",
  JWT_ISSUER_CLIENT_ID: "${JWT_ISSUER_CLIENT_ID:-play-golf}",
};
