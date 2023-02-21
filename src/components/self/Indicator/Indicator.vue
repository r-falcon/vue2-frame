<script type="text/jsx">
import styles from './Indicator.module.scss'

export default {
 name: 'Indicator',
 props: {
    title: {
      type: String,
      default: () => ''
    },
    icon: {
      type: [String, Number],
      default: () => ''
    },
    value: {
      type: [Number, String],
      default: () => 0
    },
    ratio: {
      type: [Number],
      default: () => 0
    }
  },
  computed: {
    valueFormat: function() {
      return `${this.value}%`;
    },
    isRatioUp: function() {
      return this.ratio > 0;
    },
    ratioIcon: function() {
      return this.isRatioUp ? 'arrow-up' : 'arrow-down';
    }
  },
  render() {
    /*

     */
    return (
      <div class={[styles.indicator]}>
        <div class={[styles.indicator_icon]}>
          <img
            class={styles.indicator_icon_img}
            src="https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF"
            alt="icon"
          />
        </div>
        <div class={styles.indicator_content}>
          <div class={styles.indicator_content_title}>{this.title}</div>
          <div class={styles.indicator_content_value}>{this.valueFormat}</div>
          <div class={styles.indicator_content_ratio}>
            <span class={[
              styles['indicator_content_ratio-up'],
              {
                [styles['indicator_content_ratio-down']]: !this.isRatioUp
              }
            ]}>
              <svg-icon iconClass={this.ratioIcon} />{Math.abs(this.ratio)}%
            </span>
            <span>同比上季度</span>
          </div>
        </div>
      </div>
    )
  }
}
</script>
