import { BearerStrategy } from 'passport-azure-ad';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
/**
 * PassportStrategy determines the way the authentication will be executed, usually a validation method needs
 * to be implemented, when doing this, but the default implementation is enough when using bearer strategy.
 * this part is reponsible for azure sign in.
 */
@Injectable()
export class AADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-auth-bearer', //name, could be what ever you want, just make sure that other places that refer to this string are changed as well
) {
  constructor() {
    const authenticatedUserTokens: any[] = []; //this array collects the users' tokens

    super(
      {
        identityMetadata:
          'https://login.microsoftonline.com/click.onmicrosoft.com/.well-known/openid-configuration',
        //identityMetadata this should stay the same and not be changed for the authentication to work
        clientID: '1c5e04df-0293-4b70-9c62-edc0f3e0b49a', //here should be written the app's ID,
        // Don't change othe things, unless you know what you are doing
        loggingNoPII: false,
        validateIssuer: false,
        allowHttpForRedirectUrl: true,
      },
      (token, done) => {
        let currentUser = null;

        //if user exists, take hes token
        const userToken = authenticatedUserTokens.find((user: any) => {
          currentUser = user;
          return user.sub === token.sub;
        });
        //otherwise add the token
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
