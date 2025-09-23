import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
        rules: {
            'no-undef': ['error'],
            'no-unused-vars': 'warn',
        },
    },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
])
