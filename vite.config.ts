import solid from 'solid-start/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    ssr: {
        noExternal: ['solid-styled-components'],
    },
    plugins: [
        Icons({
            compiler: 'solid',
            customCollections: {
                routex: FileSystemIconLoader('./src/assets/icons'),
            },
        }),
        solid({
            adapter: 'solid-start-static',
        }),
    ],
})
