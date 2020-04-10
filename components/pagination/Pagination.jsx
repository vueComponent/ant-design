import PropTypes from '../_util/vue-types';
import VcSelect from '../select';
import MiniSelect from './MiniSelect';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getOptionProps, getListeners } from '../_util/props-util';
import VcPagination from '../vc-pagination';
import enUS from '../vc-pagination/locale/en_US';
import LeftOutlined from '@ant-design/icons-vue/LeftOutlined';
import RightOutlined from '@ant-design/icons-vue/RightOutlined';
import DoubleLeftOutlined from '@ant-design/icons-vue/DoubleLeftOutlined';
import DoubleRightOutlined from '@ant-design/icons-vue/DoubleRightOutlined';
import { ConfigConsumerProps } from '../config-provider';

export const PaginationProps = () => ({
  total: PropTypes.number,
  defaultCurrent: PropTypes.number,
  disabled: PropTypes.bool,
  current: PropTypes.number,
  defaultPageSize: PropTypes.number,
  pageSize: PropTypes.number,
  hideOnSinglePage: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  buildOptionText: PropTypes.func,
  showSizeChange: PropTypes.func,
  showQuickJumper: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  showTotal: PropTypes.any,
  size: PropTypes.string,
  simple: PropTypes.bool,
  locale: PropTypes.object,
  prefixCls: PropTypes.string,
  selectPrefixCls: PropTypes.string,
  itemRender: PropTypes.any,
  role: PropTypes.string,
  showLessItems: PropTypes.bool,
});

export const PaginationConfig = () => ({
  ...PaginationProps(),
  position: PropTypes.oneOf(['top', 'bottom', 'both']),
});

export default {
  name: 'APagination',
  model: {
    prop: 'current',
    event: 'change.current',
  },
  props: {
    ...PaginationProps(),
  },
  inject: {
    configProvider: { default: () => ConfigConsumerProps },
  },
  methods: {
    getIconsProps(prefixCls, direction) {
      let prevIcon = (
        <a class={`${prefixCls}-item-link`}>
          <LeftOutlined />
        </a>
      );
      let nextIcon = (
        <a class={`${prefixCls}-item-link`}>
          <RightOutlined />
        </a>
      );
      let jumpPrevIcon = (
        <a class={`${prefixCls}-item-link`}>
          {/* You can use transition effects in the container :) */}
          <div class={`${prefixCls}-item-container`}>
            <DoubleLeftOutlined class={`${prefixCls}-item-link-icon`} />
            <span class={`${prefixCls}-item-ellipsis`}>•••</span>
          </div>
        </a>
      );
      let jumpNextIcon = (
        <a class={`${prefixCls}-item-link`}>
          {/* You can use transition effects in the container :) */}
          <div class={`${prefixCls}-item-container`}>
            <DoubleRightOutlined class={`${prefixCls}-item-link-icon`} />
            <span class={`${prefixCls}-item-ellipsis`}>•••</span>
          </div>
        </a>
      );
      // change arrows direction in right-to-left direction
      if (direction === 'rtl') {
        let temp;
        temp = prevIcon;
        prevIcon = nextIcon;
        nextIcon = temp;

        temp = jumpPrevIcon;
        jumpPrevIcon = jumpNextIcon;
        jumpNextIcon = temp;
      }
      return {
        prevIcon,
        nextIcon,
        jumpPrevIcon,
        jumpNextIcon,
      };
    },
    renderPagination(contextLocale) {
      const {
        prefixCls: customizePrefixCls,
        selectPrefixCls: customizeSelectPrefixCls,
        buildOptionText,
        size,
        locale: customLocale,
        ...restProps
      } = getOptionProps(this);
      const getPrefixCls = this.configProvider.getPrefixCls;
      const direction = this.configProvider.direction;
      const prefixCls = getPrefixCls('pagination', customizePrefixCls);
      const selectPrefixCls = getPrefixCls('select', customizeSelectPrefixCls);

      const isSmall = size === 'small';
      const paginationProps = {
        props: {
          prefixCls,
          selectPrefixCls,
          ...restProps,
          ...this.getIconsProps(prefixCls, direction),
          selectComponentClass: isSmall ? MiniSelect : VcSelect,
          locale: { ...contextLocale, ...customLocale },
          buildOptionText: buildOptionText || this.$scopedSlots.buildOptionText,
        },
        class: {
          mini: isSmall,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        on: getListeners(this),
      };

      return <VcPagination {...paginationProps} />;
    },
  },
  render() {
    return (
      <LocaleReceiver
        componentName="Pagination"
        defaultLocale={enUS}
        scopedSlots={{ default: this.renderPagination }}
      />
    );
  },
};
