export class TokensPayload {
  sub: number;
  role: 'normal' | 'admin' | 'gold';
}
