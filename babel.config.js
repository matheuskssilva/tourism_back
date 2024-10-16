// babel.config.js
export default {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                },
                modules: false, // Isso garante que não haverá transformação para CommonJS
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                // '@config': './src/config',
                // '@models': './src/models',
                // '@controllers': './src/controllers',
                // '@views': './src/views'
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}