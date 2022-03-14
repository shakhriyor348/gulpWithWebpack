// Подключаем основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from './gulp/config/path.js';
import {plugins} from './gulp/config/plugins.js';


// Передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'), /* режим продакшн */
    isDev: !process.argv.includes('--build'), /* режим разработчика */
    path: path,
    gulp: gulp,
    plugins
}



// импорт задач
// import { copy } from './gulp/tasks/copy.js';
import {reset} from './gulp/tasks/reset.js';
import {html} from './gulp/tasks/html.js';
import {server } from './gulp/tasks/server.js';
import { style } from './gulp/tasks/style.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import {otfToTtf, ttfToWoff, } from './gulp/tasks/fonts.js';
import {svgSprite} from './gulp/tasks/svgSprite.js';






// Наблюдатель за изменениями в файлах
function watcher() {
    // gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.style, style)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}

export {svgSprite} /* для того чтобы отдельно запускать иконки */

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, )

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(html, style, js, images)) /* parallel - параллельное выполнение задач */
 
// Построение сценариев выполнения задач
// const dev = gulp.series(reset, mainTasks, watcher, server); /* Последовательное выполнение задач */
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); /* Последовательное выполнение задач */
/* после server.js */
const build = gulp.series(reset, mainTasks)

// экспорт сценариев
export {dev}
export {build}

// выполнения сценария по умолчанию
gulp.task('default', dev);