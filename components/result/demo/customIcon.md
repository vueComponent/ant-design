<cn>
#### 自定义 icon
自定义 icon。
</cn>

<us>
#### Custom icon
Custom icon.
</us>

```html
<template>
  <a-result title="Great, we have done all the operations!">
    <template v-slot:icon>
      <a-icon type="smile" theme="twoTone" />
    </template>
    <template v-slot:extra>
      <a-button type="primary">Next</a-button>
    </template>
  </a-result>
</template>
<script>
  export default {
    data() {
      return {
      };
    },
  };
</script>
```
