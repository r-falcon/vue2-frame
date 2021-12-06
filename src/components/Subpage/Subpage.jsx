const Subpage = {
  name: 'Subpage',
  render() {
    return (
      <div class="app-container">
        <el-page-header
          style={{ marginBottom: '20px' }}
          {...{
            props: this.$attrs,
            on: this.$listeners
          }}
        />
        {this.$slots.default}
      </div>
    );
  }
};

export { Subpage };
