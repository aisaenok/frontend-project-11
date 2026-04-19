import i18next from 'i18next'
import ru from './locales/ru.js'

const initI18n = () => {
  const instance = i18next.createInstance()

  return instance.init({
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  }).then(() => instance)
}

export default initI18n
