<template>
  <div style="margin-bottom: 15px;">
    <title-bar :title="dataSource.title"> </title-bar>
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
          rankFinal: []
        }
      }
    }
  },
  data() {
    return {
      rankTableKey: 'rankFinal',
      rankTableArr: [
        {
          label: '总',
          value: 'rankFinal'
        },
        {
          label: '月',
          value: 'rankMonth'
        },
        {
          label: '周',
          value: 'rankWeek'
        }
        // {
        //   label: '日',
        //   value: 'rankDay',
        // },
      ],
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
          title: '更新日期',
          key: 'date',
          align: 'right'
        }
      ]
    }
  },
  methods: {
    handleChangeRankTableKey(item) {
      this.rankTableKey = item.value
    }
  }
}
</script>
