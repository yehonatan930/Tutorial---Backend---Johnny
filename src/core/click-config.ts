export default {
    credentials: {
      tenantID: process.env.CLICK_TENANT_ID as string,
      clientID: process.env.CLICK_CLIENT_ID as string,
    },
    metadata: {
      authority: 'login.microsoftonline.com',
      discovery: '.well-known/openid-configuration',
      version: 'v2.0',
      scope: ['access'],
    },
    settings: {
      validateIssuer: true,
      passReqToCallback: false,
      loggingLevel: 'info' as const,
    },
  };
  