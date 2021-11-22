export interface IdentityConfig {
  getIdentityHost(): string;
  getIdentityIssuer(): string;
  getIdentityAudience(): string;
  getIdentitySecret(): string;
  getIdentityJwkUri(): string;
}