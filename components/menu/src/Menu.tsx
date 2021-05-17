import { Key } from '../../_util/type';
import {
  computed,
  defineComponent,
  ExtractPropTypes,
  ref,
  PropType,
  inject,
  watchEffect,
} from 'vue';
import useProvideMenu, { useProvideFirstLevel } from './hooks/useMenuContext';
import useConfigInject from '../../_util/hooks/useConfigInject';
import { MenuTheme, MenuMode, BuiltinPlacements, TriggerSubMenuAction } from './interface';
import devWarning from 'ant-design-vue/es/vc-util/devWarning';
import { collapseMotion } from 'ant-design-vue/es/_util/transition';

export const menuProps = {
  prefixCls: String,
  disabled: Boolean,
  inlineCollapsed: Boolean,
  overflowDisabled: Boolean,

  theme: { type: String as PropType<MenuTheme>, default: 'light' },
  mode: { type: String as PropType<MenuMode>, default: 'vertical' },

  inlineIndent: { type: Number, default: 24 },
  subMenuOpenDelay: { type: Number, default: 0.1 },
  subMenuCloseDelay: { type: Number, default: 0.1 },

  builtinPlacements: { type: Object as PropType<BuiltinPlacements> },

  triggerSubMenuAction: { type: String as PropType<TriggerSubMenuAction>, default: 'hover' },

  getPopupContainer: Function as PropType<(node: HTMLElement) => HTMLElement>,
};

export type MenuProps = Partial<ExtractPropTypes<typeof menuProps>>;

export default defineComponent({
  name: 'AMenu',
  props: menuProps,
  emits: ['update:openKeys', 'openChange'],
  setup(props, { slots, emit }) {
    const { prefixCls, direction } = useConfigInject('menu', props);

    const siderCollapsed = inject(
      'layoutSiderCollapsed',
      computed(() => undefined),
    );
    const inlineCollapsed = computed(() => {
      const { inlineCollapsed } = props;
      if (siderCollapsed.value !== undefined) {
        return siderCollapsed.value;
      }
      return inlineCollapsed;
    });

    watchEffect(() => {
      devWarning(
        !('inlineCollapsed' in props && props.mode !== 'inline'),
        'Menu',
        '`inlineCollapsed` should only be used when `mode` is inline.',
      );

      devWarning(
        !(siderCollapsed.value !== undefined && 'inlineCollapsed' in props),
        'Menu',
        '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.',
      );
    });

    const activeKeys = ref([]);
    const openKeys = ref([]);
    const selectedKeys = ref([]);
    const changeActiveKeys = (keys: Key[]) => {
      activeKeys.value = keys;
    };
    const disabled = computed(() => !!props.disabled);
    const isRtl = computed(() => direction.value === 'rtl');
    const mergedMode = ref<MenuMode>('vertical');
    const mergedInlineCollapsed = ref(false);
    watchEffect(() => {
      if (props.mode === 'inline' && inlineCollapsed.value) {
        mergedMode.value = 'vertical';
        mergedInlineCollapsed.value = inlineCollapsed.value;
      }
      mergedMode.value = props.mode;
      mergedInlineCollapsed.value = false;
    });

    const className = computed(() => {
      return {
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-root`]: true,
        [`${prefixCls.value}-${mergedMode.value}`]: true,
        [`${prefixCls.value}-inline-collapsed`]: mergedInlineCollapsed.value,
        [`${prefixCls.value}-rtl`]: isRtl.value,
        [`${prefixCls.value}-${props.theme}`]: true,
      };
    });

    const defaultMotions = {
      horizontal: { motionName: `ant-slide-up` },
      inline: collapseMotion,
      other: { motionName: `ant-zoom-big` },
    };

    useProvideFirstLevel(true);

    const onOpenChange = (key: Key, open: boolean) => {
      // emit('update:openKeys', openKeys);
      emit('openChange', open);
    };

    useProvideMenu({
      prefixCls,
      activeKeys,
      openKeys,
      selectedKeys,
      changeActiveKeys,
      disabled,
      rtl: isRtl,
      mode: mergedMode,
      inlineIndent: computed(() => props.inlineIndent),
      subMenuCloseDelay: computed(() => props.subMenuCloseDelay),
      subMenuOpenDelay: computed(() => props.subMenuOpenDelay),
      builtinPlacements: computed(() => props.builtinPlacements),
      triggerSubMenuAction: computed(() => props.triggerSubMenuAction),
      getPopupContainer: computed(() => props.getPopupContainer),
      inlineCollapsed: mergedInlineCollapsed,
      antdMenuTheme: computed(() => props.theme),
      siderCollapsed,
      defaultMotions,
      overflowDisabled: computed(() => props.overflowDisabled),
      onOpenChange,
    });
    return () => {
      return <ul class={className.value}>{slots.default?.()}</ul>;
    };
  },
});