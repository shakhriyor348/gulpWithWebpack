import fileInclude from "gulp-file-include";
import webpHtmlNosvg from 'gulp-webp-html-nosvg'; /* формирование webp */
import versionNumber from 'gulp-version-number'; /* Чтобы данные не кэшировались а обновлялись постоянно */
import pug from 'gulp-pug';

export const html = () => {
    return app.gulp.src(app.path.src.html) 
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: "HTML",
        message: "Error: <%= error.message %>"
    })))
    // .pipe(fileInclude())
    .pipe(pug({
        /* сжатие HTML файла */
        pretty: true,
        /* Показ в терминале какой файл обработан */
        verbose:true
    }))
    .pipe(webpHtmlNosvg())
    .pipe(versionNumber(
        {
            'value': '%DT%', /* указываем текущую дату */
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js',
                ]
            },
            'output': {
                'file': 'gulp/version.json' /* там где хранится ключ */
            }
        }

    ))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())
}