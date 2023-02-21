<script type="text/jsx">
import Chart from './Chart'
import styles from './Chart.module.scss'

export default {
  name: 'CaptionChart',
  props: {
    title: {
      type: String,
      default: () => ''
    }
  },
  render() {
    return (
      <div class={styles.container}>
        {this.$slots.title || <h3>{this.title}</h3>}
        <Chart {...{
          props: this.$attrs
        }} />
      </div>
    )
  }
}
</script>
