import { BearerStrategy } from 'passport-azure-ad';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-auth-bearer',
) {
  constructor() {
    const authenticatedUserTokens: any[] = [];

    super(
      {
        identityMetadata:
          'https://login.microsoftonline.com/click.onmicrosoft.com/.well-known/openid-configuration',
        clientID: '1c5e04df-0293-4b70-9c62-edc0f3e0b49a',
        loggingNoPII: false,
        validateIssuer: false,
        allowHttpForRedirectUrl: true,
      },
      (token, done) => {
        console.log('verifying the user');
        console.log(token.name, 'was the token retreived');
        let currentUser = null;

        const userToken = authenticatedUserTokens.find((user: any) => {
          currentUser = user;
          return user.sub === token.sub;
        });

        if (!userToken) {
          authenticatedUserTokens.push(token);
          currentUser = token;
          return done(null, token);
        }

        return done(null, currentUser, token);
      },
    );
  }
}
