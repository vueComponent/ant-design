<cn>
#### Warning
警告类型的结果。
</cn>

<us>
#### Warning
The result of the warning.
</us>

```html
<template>
  <a-result status="warning" title="There are some problems with your operation.">
    <template v-slot:extra>
      <a-button type="primary" key="console">Go Console</a-button>
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
