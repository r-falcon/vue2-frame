<script type="text/jsx">
import styles from './CardPanel.module.scss';

export default {
  name: 'CardPanel',
   props: {
    title: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: () => 'basic',
      validator: function(value) {
        return ['simple', 'basic'].includes(value);
      }
    },
    showAction: {
      type: Boolean,
      default: () => false
    },
    actionName: {
      type: String,
      default: () => ''
    }
  },
  render() {
    return (
      <el-card
        {...{
          props: this.$attrs
        }}
        body-style={{ padding: '0px', position: 'relative' }}
        class={styles.card}
      >
        {
          Object.is(this.type, 'basic') ? (
            <div slot="header">
              <span>{this.title}</span>
              {
                this.showAction ? (
                  <el-button style="float: right; padding: 3px 0" type="text">{this.actionName}</el-button>
                ) : null
              }
            </div>
          ) : null
        }
        {this.$slots.default}
      </el-card>
    );
  },
}
</script>
