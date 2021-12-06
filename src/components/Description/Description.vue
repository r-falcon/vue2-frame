<script type="text/jsx">
import styles from './Description.module.scss';

export default {
  name: 'Description',
  functional: true,
  render: function(h, context) {
    const { label, value, width = 'auto' } = context.props;
    return (
      <div class={styles.description_content} style={{ width: width }}>
        {
          label ? <span class={styles.description_content_label}>{label}:</span> : null
        }
        <span class={styles.description_content_value}>
          {
            (value || context.children) || '暂无信息'
          }
        </span>
      </div>
    );
  }
};
</script>