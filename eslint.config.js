import cheminfo from 'eslint-config-cheminfo';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['node_modules']),
  cheminfo,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
]);
