export function getAppBaseUrl() {
  return process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
}
