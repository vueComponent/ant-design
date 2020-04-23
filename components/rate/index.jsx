import omit from 'omit.js';
import classNames from 'classnames';
import PropTypes from '../_util/vue-types';
import { getOptionProps, getComponentFromProp, getListeners } from '../_util/props-util';
import { ConfigConsumerProps } from '../config-provider';
import VcRate from '../vc-rate';
import StarFilled from '@ant-design/icons-vue/StarFilled';
import Tooltip from '../tooltip';
import Base from '../base';

export const RateProps = {
  prefixCls: PropTypes.string,
  count: PropTypes.number,
  value: PropTypes.value,
  defaultValue: PropTypes.value,
  allowHalf: PropTypes.bool,
  allowClear: PropTypes.bool,
  tooltips: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  character: PropTypes.any,
  autoFocus: PropTypes.bool,
};

const Rate = {
  name: 'ARate',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: RateProps,
  inject: {
    configProvider: { default: () => ConfigConsumerProps },
  },
  methods: {
    characterRender(node, { index }) {
      const { tooltips } = this.$props;
      if (!tooltips) return node;
      return <Tooltip title={tooltips[index]}>{node}</Tooltip>;
    },
    focus() {
      this.$refs.refRate.focus();
    },
    blur() {
      this.$refs.refRate.blur();
    },
  },
  render() {
    const { prefixCls: customizePrefixCls, ...restProps } = getOptionProps(this);
    const getPrefixCls = this.configProvider.getPrefixCls;
    const direction = this.configProvider.direction;
    const prefixCls = getPrefixCls('rate', customizePrefixCls);
    const rateClassNames = classNames({
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });

    const character = getComponentFromProp(this, 'character') || <StarFilled />;
    const rateProps = {
      props: {
        character,
        characterRender: this.characterRender,
        prefixCls,
        ...omit(restProps, ['tooltips']),
      },
      on: getListeners(this),
      ref: 'refRate',
    };
    return <VcRate {...rateProps} class={rateClassNames} direction={direction} />;
  },
};

/* istanbul ignore next */
Rate.install = function(Vue) {
  Vue.use(Base);
  Vue.component(Rate.name, Rate);
};
export default Rate;
