import { AuthData as AUTH } from '@/api/token/authData';
import {
  ClientBuilder,
  type Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey: string = AUTH.projectKey;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH.authUrl,
  projectKey,
  credentials: {
    clientId: AUTH.clientId,
    clientSecret: AUTH.clientSecret,
  },
  scopes: [AUTH.scopes],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: AUTH.baseUrl,
  fetch,
};

export const ctpClient: Client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
