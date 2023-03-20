import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://valid-stingray-46.hasura.app/v1/graphql',
  documents: 'queries/**/*.ts',
  generates: {
    'types/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
