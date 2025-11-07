// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Importa los estilos globales
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        ssr: true,
        theme: {
            defaultTheme: 'light',
        },
    })

    nuxtApp.vueApp.use(vuetify)
})
