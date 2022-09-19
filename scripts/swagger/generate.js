const fs = require('fs');
const path = require('path');
const { generateApi } = require('swagger-typescript-api');

const prettierConfig = require('../../.prettierrc.js');

const apiHost = process.argv[2] || '127.0.0.1:8000';
/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  name: 'index.ts',
  output: path.resolve(process.cwd(), './src/store/api/__generated__'),
  url: `http://${apiHost}/starlight/swagger/?format=openapi`,
  templates: path.resolve(process.cwd(), './templates'),
  httpClientType: 'axios', // or "fetch"
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: false,
  extractRequestBody: false,
  prettier: prettierConfig,
  defaultResponseType: 'void',
  singleHttpClient: false,
  cleanOutput: false,
  enumNamesAsValues: true,
  moduleNameFirstTag: true,
  generateUnionEnums: true,
  extraTemplates: [],
  hooks: {
    onCreateComponent: (component) => {},
    onCreateRequestParams: (rawType) => {},
    onCreateRoute: (routeData) => {},
    onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
    onFormatRouteName: (routeInfo, templateRouteName) => {},
    onFormatTypeName: (typeName, rawTypeName) => {},
    onInit: (configuration) => {},
    onParseSchema: (originalSchema, parsedSchema) => {},
    onPrepareConfig: (currentConfiguration) => {},
  },
});
