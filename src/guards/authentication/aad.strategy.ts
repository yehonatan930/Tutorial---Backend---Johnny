import { BearerStrategy } from 'passport-azure-ad';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import click_config from '../../core/click-config';
import { ConfigService } from '@nestjs/config';
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
  constructor(private readonly configService: ConfigService) {
    const authenticatedUserTokens: any[] = []; //this array collects the users' tokens
    
    super(
      {
        identityMetadata: `https://${click_config.metadata.authority}/${configService.get<string>('CLICK_TENANT_ID')}/${click_config.metadata.version}/${click_config.metadata.discovery}`,
        issuer: `https://${click_config.metadata.authority}/${configService.get<string>('CLICK_TENANT_ID')}/${click_config.metadata.version}`,
        //identityMetadata this should stay the same and not be changed for the authentication to work
        clientID: configService.get<string>('CLICK_CLIENT_ID'), //here should be written the app's ID,
        // Don't change other things, unless you know what you are doing
        //TODO add explanation about the scope.
        loggingNoPII: false,//prints a lot of things related to login, consider on production to make it false
        validateIssuer: true,
        loggingLevel: 'info',
        allowHttpForRedirectUrl: true,
        scope:  ["access"],
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
