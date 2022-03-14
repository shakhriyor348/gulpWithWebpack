import fs from 'fs'; /* Плагин node js который работает с файловой системой */
import fonter from 'gulp-fonter'; /* преобразует из otf в ttf */
import ttf2woff2 from 'gulp-ttf2woff2'; /* Сделает такой формат. самые оптимизированные */

// Конвертация
export const otfToTtf = () => {
    // ищем файлы с форматос .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {}) /* обращаемся к папке с исходниками */
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
    })))
    // конвертация в ttf
    .pipe(fonter({
        formats: ['ttf'] /* формируем формат ttf */
    }))
    // выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}


export const ttfToWoff = () => {
    // ищем файлы .ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
    })))
    // конвертируем в woff
    .pipe(fonter({
        formats: ['woff'] /* формируем формат woff */
    }))
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // ищем файлы .ttf
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // конвертируем в woff2
    .pipe(ttf2woff2())
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}


// export const fontsStyle = () => {
//     // файл стилей подключения шрифтов
//     let fontsFile = `${app.path.srcFolder}/style/fonts.scss`;
//     // проверяем существуют ли файлы шрифтов
//     fs.readdir(app.path.build.fonts, function (err, fontsFiles) { 
//         if(fontsFiles) {
//             // Проверяем существует ли файл стилей для подключения шрифтов
//             if(!fs.existsSync(fontsFile)) {
//                 // если файла нет, создаем его
//                 fs.writeFile(fontsFile, ' ', cb);
//                 let newFileOnly;
//                 for(let i = 0; i < fontsFile.length; i++) {
//                     // записываем подключения шрифтов в файл стилей
//                     let fontFileName = fontsFile[i].split('.')[0]
//                     if(newFileOnly !== fontFileName) {
//                         let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
//                         let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
//                         if(fontWeight.toLowerCase() === 'thin') {
//                             fontWeight = 100
//                         }else if(fontWeight.toLowerCase() === 'extralight') {
//                             fontWeight = 200
//                         }else if(fontWeight.toLowerCase() === 'light') {
//                             fontWeight = 300;
//                         }else if(fontWeight.toLowerCase() === 'medium') {
//                             fontWeight = 500
//                         }else if(fontWeight.toLowerCase() === 'semibold') {
//                             fontWeight = 600
//                         }else if(fontWeight.toLowerCase() === 'bold') {
//                             fontWeight = 700
//                         }else if(fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
//                             fontWeight = 800
//                         }else if(fontWeight.toLowerCase() === 'black') {
//                             fontWeight = 900
//                         }else {
//                             fontWeight = 400
//                         }
//                     fs.appendFile(fontsFile, 
//                         `@font-face {
//                             font-family: ${fontName};
//                             font-display: swap;
//                             src: url('../fonts/${fontFileName}.woff2') format("woff2");
//                             font-weight: ${fontWeight};
//                             font-style: norlmal;
//                         }\r\n`,cb
//                         )
//                         newFileOnly = fontFileName
//                     }else {
//                         console.log('Такой шрифт уже есть');
//                     }
//                 }
//             }
//         }
//      })
//      return app.gulp.src(`${app.path.srcFolder}`);
//      function cb() {  }
// }