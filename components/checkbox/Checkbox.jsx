import { inject } from 'vue';
import PropTypes from '../_util/vue-types';
import classNames from 'classnames';
import VcCheckbox from '../vc-checkbox';
import hasProp, { getOptionProps } from '../_util/props-util';
import { ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';

export default {
  name: 'ACheckbox',
  inheritAttrs: false,
  __ANT_CHECKBOX: true,
  model: {
    prop: 'checked',
  },
  props: {
    prefixCls: PropTypes.string,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    isGroup: PropTypes.bool,
    value: PropTypes.any,
    name: PropTypes.string,
    id: PropTypes.string,
    indeterminate: PropTypes.bool,
    type: PropTypes.string.def('checkbox'),
    autoFocus: PropTypes.bool,
  },

  setup() {
    return {
      configProvider: inject('configProvider', ConfigConsumerProps),
      checkboxGroupContext: inject('checkboxGroupContext', undefined),
    };
  },

  watch: {
    value(value, prevValue) {
      this.$nextTick(() => {
        const { checkboxGroupContext: checkboxGroup = {} } = this;
        if (checkboxGroup.registerValue && checkboxGroup.cancelValue) {
          checkboxGroup.cancelValue(prevValue);
          checkboxGroup.registerValue(value);
        }
      });
    },
  },
  mounted() {
    const { value, checkboxGroupContext: checkboxGroup = {} } = this;
    if (checkboxGroup.registerValue) {
      checkboxGroup.registerValue(value);
    }

    warning(
      hasProp(this, 'checked') || this.checkboxGroupContext || !hasProp(this, 'value'),
      'Checkbox',
      '`value` is not validate prop, do you mean `checked`?',
    );
  },
  beforeDestroy() {
    const { value, checkboxGroupContext: checkboxGroup = {} } = this;
    if (checkboxGroup.cancelValue) {
      checkboxGroup.cancelValue(value);
    }
  },
  methods: {
    handleChange(event) {
      const targetChecked = event.target.checked;
      this.$emit('input', targetChecked);
      this.$emit('change', event);
    },
    focus() {
      this.$refs.vcCheckbox.focus();
    },
    blur() {
      this.$refs.vcCheckbox.blur();
    },
  },

  render() {
    const props = getOptionProps(this);
    const { checkboxGroupContext: checkboxGroup, $slots, $attrs } = this;
    const children = $slots.default && $slots.default();
    const { indeterminate, prefixCls: customizePrefixCls, ...restProps } = props;
    const getPrefixCls = this.configProvider.getPrefixCls;
    const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
    const { onMouseenter, onMouseleave, onInput, ...restAttrs } = $attrs;
    const checkboxProps = {
      ...restProps,
      prefixCls,
      ...restAttrs,
    };
    if (checkboxGroup) {
      checkboxProps.onChange = (...args) => {
        this.$emit('change', ...args);
        checkboxGroup.toggleOption({ label: children, value: props.value });
      };
      checkboxProps.name = checkboxGroup.name;
      checkboxProps.checked = checkboxGroup.sValue.indexOf(props.value) !== -1;
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
      checkboxProps.indeterminate = indeterminate;
    } else {
      checkboxProps.onChange = this.handleChange;
    }
    const classString = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      <label class={classString} onMouseenter={onMouseenter} onMouseenter={onMouseleave}>
        <VcCheckbox {...checkboxProps} class={checkboxClass} ref="vcCheckbox" />
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  },
};
