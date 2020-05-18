# Добавление своих иконок

## Как добавить свою иконку

1. Положите свою иконку в директорию `icons/src/outline`. Outline - это тип иконки, доступные типы:
`outline`, `fill`, `twotone`.
2. Выполнить `npm run convert-icons`
3. Иконка должна сконвертироваться в Ant-иконку в директории `components/icon/customIcons/jsIcons/outline`

Нельзя удалять svg иконку после конвертации.

## Название иконки

Название иконки - берется из названия исходного файла, например, `mtr-eye-off.svg` сконвертируется в иконку MtrEyeOffOutline,
которую можно вызывать как `mtr-eye-off`.
Рекомендуется использовать уникальное название, не совпадающее с названием иконки в Ant.design. 
Для упрощения рекомендуется использовать префикс `mtr-`.
 