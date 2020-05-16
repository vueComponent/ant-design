# Ant Design Vue

by Mottor 💪

## Основные изменения по сравнению с оригинальным Ant Design Vue

1. Изменены стили отдельных элементов

2. Возможность растягивать компонент Select по всю ширину родительского элемента. 
Для этого нужно добавить атрибут `:full-width="true"`

```
<a-select default-value="lucy" :full-width="true">
    <a-select-option value="jack">
        Jack
    </a-select-option>
    <a-select-option value="lucy">
        Very long option.....
    </a-select-option>
</a-select>
```

3. Возможность убирать стрелку у Popover и Tooltip. Для этого нужно добавить атрибут `arrow` (bool).

Пример:

```
<a-popover placement="bottom" :arrow="false">
    <template slot="content">
        <p>Content</p>
        <p>Content</p>
    </template>
    <template slot="title">
        <span>Title</span>
    </template>
    <a-button>Bottom</a-button>
</a-popover>
```

4. Новый стиль вкладок (Tab) - убираются отступы, полоска выделения становится шириной с текст.
Для включения нужно добавить атрибут `:new-style="true"`

```
<a-tabs default-active-key="1" :new-style="true">
    <a-tab-pane key="1" tab="Tab 1">
      Tab 1
    </a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2">
      Tab 2
    </a-tab-pane>
</a-tabs>
```

5. Возможность растягивать компонент a-radio-group по всю ширину родительского элемента. 
Для этого нужно добавить атрибут `:full-width="true"`

```
<a-radio-group default-value="1" :full-width="true">
    <a-radio-button value="1">1</a-radio-button>
    <a-radio-button value="2">test</a-radio-button>
    <a-radio-button value="3">Very long option.....</a-radio-button>
</a-radio-group>
```

6. Возможность добавить иконки к пунктам Select. Для этого нужно добавить атрибут `:show-selected-icon="true"`.

```
<a-select default-value="lucy" style="width: 120px" :show-selected-icon="true">
  <a-icon slot="menuItemSelectedIcon" type="smile"/>
  <a-select-option value="jack">
    Jack
  </a-select-option>
  <a-select-option value="lucy">
    Lucy
  </a-select-option>
</a-select>
```

По умолчанию иконка - галочка:

```
<a-select default-value="lucy" style="width: 120px" :show-selected-icon="true">
  <a-select-option value="jack">
    Jack
  </a-select-option>
  <a-select-option value="lucy">
    Lucy
  </a-select-option>
</a-select>
```

7. У компонента a-input-search добавлены опции:

- `icon-position` (`after`, `before`) - положение иконки с лупой, по умолчанию (`after`)- после поля ввода
- `disable-icon-events` (bool) - отключает кликабельность иконки с лупой

```
<a-input-search 
    icon-position="before"
    :disable-icon-events="true"
    placeholder="icon-position=before" 
    style="width: 200px" />
```
