// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = './app/build';
const srcFolder = './app/src';

export const path = {
    build: {
        images: `${buildFolder}/img/`,
        js: `${buildFolder}/script/`,
        style: `${buildFolder}/style/`,
        html: `${buildFolder}/`,
        fonts: `${buildFolder}/fonts/` /* Только тут.  */
    }, /* объект путей с результатом*/
    src: {
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        js: `${srcFolder}/script/app.js`,
        style: `${srcFolder}/style/style.scss`,
        html: `${srcFolder}/*.{html,pug,jade}`,
        svgicons: `${srcFolder}/svgicons/*.svg`
    }, /* Обект путей с исходным файлом */
    watch: {
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
        js: `${srcFolder}/script/**/*.js`,
        style: `${srcFolder}/style/**/*.scss`,
        html: `${srcFolder}/**/*.{html,pug,jade}`,
        files: `${srcFolder}/**/*.*`
    }, /* объект путей к файлам и папкам за которыми должен следить наш gulp */
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder
}