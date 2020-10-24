<template>
  <div style="margin-bottom: 15px;">
    <title-bar :title="dataSource.title" :bottom="0"></title-bar>
    <z-table :columns="columns" :data="dataSource.list" :show-header="false" :border="false" size="small" />
  </div>
</template>

<script>
import TitleBar from '@/components/kit/TitleBar/TitleBar'
import ZTable from '@/components/base/Table/Table'

export default {
  name: 'EbookRankingPart',
  components: {
    TitleBar,
    ZTable
  },
  props: {
    dataSource: {
      type: Object,
      default() {
        return {
          title: '',
          list: []
        }
      }
    }
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          width: '45px',
          render: (h, params) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index', params.index <= 2 ? `ebook-rank-index-${params.index}` : '']
              },
              params.index + 1
            )
          }
        },
        {
          title: '书名',
          key: 'name',
          align: 'left',
          render: (h, params) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/${params.row.bookId}`
                  }
                },
                class: 'ebook-catalog-link'
              },
              params.row.name
            )
          }
        },
        {
          title: '类型',
          key: 'type',
          align: 'right'
        }
      ]
    }
  }
}
</script>
