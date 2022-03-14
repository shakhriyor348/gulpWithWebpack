import plumber from 'gulp-plumber'; /* обработка ошибок */
import notify from 'gulp-notify'; /* Сообщения (подсказки) */
import browsersync from 'browser-sync'; /* этот плагин для открытия браузера и перезагрузки */
import newer from 'gulp-newer'; /* Проверка обновления. Проверяем есть ли у нас такая картинка */
import ifPlugin from 'gulp-if'; /* Плагин для режима продакшн. Условное ветвление */

// экпортируем объект
export const plugins = {
    plumber,
    notify,
    browsersync,
    newer,
    if: ifPlugin
}