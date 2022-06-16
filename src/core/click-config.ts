export default {
    credentials: {
      tenantID: '78820852-55fa-450b-908d-45c0d911e76b',
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
  