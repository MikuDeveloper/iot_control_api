import { AuthorizationGuard } from './authorization.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthorizationGuard', () => {
  it('should be defined', () => {
    expect(new AuthorizationGuard(new JwtService())).toBeDefined();
  });
});
