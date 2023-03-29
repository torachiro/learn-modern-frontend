import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://valid-stingray-46.hasura.app/v1/graphql': {
        headers: {
          'x-hasura-admin-secret':
            process.env.NEXT_PUBLIC_HASURA_KEY || 'hasuratest1123',
        },
      },
    },
  ],
  documents: 'queries/**/*.ts',
  ignoreNoDocuments: true,
  generates: {
    'types/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
