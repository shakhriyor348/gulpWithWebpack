import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; /* Сжатие css файлов */
import autoprefixer from 'gulp-autoprefixer'; /* добавление вендорных префиксов */
import groupCssMediaQueries from 'gulp-group-css-media-queries'; /* Группировка media запросов. И перемещает в конец файла */

const sass = gulpSass(dartSass)
export const style = () => {
    return app.gulp.src(app.path.src.style, {sourcemaps: true}) /* чтобы видеть ошибки. карты исходников */
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: "CSS",
        message: "Error: <%= error.message %>"
    })))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(groupCssMediaQueries())
    .pipe(autoprefixer({
        grid: true,
        overrideBrowserlist: ["last 1 versions"], /* Поддержка версий браузеров. 3 версии назад */
        cascade: true
    }))
    .pipe(cleanCss())
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.style))
    .pipe(app.plugins.browsersync.stream())
}