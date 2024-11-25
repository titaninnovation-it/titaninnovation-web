const services = [
    {
        name: 'titanjaya',
    },
];

const config = services.reduce((result, service) => {
    return {
        ...result,
        [service.name]: {
            input: `https://app-titan-api-sea-dev-001-fubfehb7e7aabagz.southeastasia-01.azurewebsites.net/swagger/v1/swagger.json`,
            output: {
                mode: 'split',
                target: `src/orval/type.ts`,
                client: 'react-query',
                // override: {
                //     mutator: {
                //         path: 'src/libs/axios.lib.ts',
                //         name: 'customAxiosInstance',
                //     },
                // },
            },
            // hooks: {
            //     afterAllFilesWrite: 'prettier --write',
            // },
        },
    };
}, {});

export default config;
