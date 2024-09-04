import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {UserConfigBase} from "./src/UserConfigBase";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: UserConfigBase
})
