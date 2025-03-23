import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'srv'),
            '@tests': path.resolve(__dirname, 'test')
        }
    }
});
