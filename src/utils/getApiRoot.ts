import { AuthData as AUTH } from '@/api/token/authData';
import type { ApiRoot, ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/api/commerceToolsClient';

const apiRoot: ApiRoot = createApiBuilderFromCtpClient(ctpClient);

export const getApiRoot: () => ByProjectKeyRequestBuilder = () =>
  apiRoot.withProjectKey({ projectKey: AUTH.projectKey });
