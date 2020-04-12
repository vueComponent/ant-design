import CloseOutlined from '@ant-design/icons-vue/CloseOutlined';
import CheckOutlined from '@ant-design/icons-vue/CheckOutlined';
import PropTypes from '../_util/vue-types';
import { initDefaultProps, getOptionProps, getListeners } from '../_util/props-util';
import VcSteps from '../vc-steps';
import { ConfigConsumerProps } from '../config-provider';
import Base from '../base';
import classNames from 'classnames';

const getStepsProps = (defaultProps = {}) => {
  const props = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    current: PropTypes.number,
    initial: PropTypes.number,
    labelPlacement: PropTypes.oneOf(['horizontal', 'vertical']).def('horizontal'),
    status: PropTypes.oneOf(['wait', 'process', 'finish', 'error']),
    size: PropTypes.oneOf(['default', 'small']),
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    type: PropTypes.oneOf(['default', 'navigation']),
  };
  return initDefaultProps(props, defaultProps);
};

const Steps = {
  name: 'ASteps',
  props: getStepsProps({
    current: 0,
  }),
  inject: {
    configProvider: { default: () => ConfigConsumerProps },
  },
  model: {
    prop: 'current',
    event: 'change',
  },
  Step: { ...VcSteps.Step, name: 'AStep' },
  render() {
    const props = getOptionProps(this);
    const { prefixCls: customizePrefixCls, iconPrefix: customizeIconPrefixCls } = props;
    const getPrefixCls = this.configProvider.getPrefixCls;
    const direction = this.configProvider.direction;
    const prefixCls = getPrefixCls('steps', customizePrefixCls);
    const iconPrefix = getPrefixCls('', customizeIconPrefixCls);

    const icons = {
      finish: <CheckOutlined class={`${prefixCls}-finish-icon`} />,
      error: <CloseOutlined class={`${prefixCls}-error-icon`} />,
    };

    const className = classNames({
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });

    const stepsProps = {
      props: {
        icons,
        iconPrefix,
        prefixCls,
        ...props,
      },
      on: getListeners(this),
      scopedSlots: this.$scopedSlots,
    };
    return (
      <VcSteps {...stepsProps} class={className}>
        {this.$slots.default}
      </VcSteps>
    );
  },
};

/* istanbul ignore next */
Steps.install = function(Vue) {
  Vue.use(Base);
  Vue.component(Steps.name, Steps);
  Vue.component(Steps.Step.name, Steps.Step);
};

export default Steps;
