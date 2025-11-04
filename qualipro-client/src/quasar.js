import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/en-US'
import quasarIconSet from 'quasar/icon-set/material-icons'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

export default (app) => {
    app.use(Quasar, {
        plugins: {},
        lang: quasarLang,
        iconSet: quasarIconSet,
    })
}
