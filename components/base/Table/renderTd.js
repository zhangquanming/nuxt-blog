export default {
  name: 'TableTdRender',
  functional: true,
  props: {
    render: Function,
    column: Object,
    row: Object,
    index: Number
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
      column: ctx.props.column
    }
    return ctx.props.render(h, params)
  }
}
