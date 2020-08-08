<template>
  <div style="height: 100%;">
    <write-editor></write-editor>
  </div>
</template>

<script>
import WriteEditor from '@/pages/admin/write/index.vue'

export default {
  name: 'UserWrite',
  layout: 'user',
  components: {
    WriteEditor
  }
}
</script>
