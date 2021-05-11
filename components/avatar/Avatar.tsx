import { tuple, VueNode } from '../_util/type';
import {
  computed,
  CSSProperties,
  defineComponent,
  ExtractPropTypes,
  inject,
  nextTick,
  onMounted,
  onUpdated,
  PropType,
  ref,
  unref,
  watch,
} from 'vue';
import { defaultConfigProvider } from '../config-provider';
import { getPropsSlot } from '../_util/props-util';
import PropTypes from '../_util/vue-types';
import useBreakpoint from '../_util/hooks/useBreakpoint';
import { Breakpoint, responsiveArray, ScreenSizeMap } from '../_util/responsiveObserve';

export type AvatarSize = 'large' | 'small' | 'default' | number | ScreenSizeMap;

export const avatarProps = {
  prefixCls: PropTypes.string,
  shape: PropTypes.oneOf(tuple('circle', 'square')),
  size: {
    type: [Number, String, Object] as PropType<AvatarSize>,
    default: (): AvatarSize => 'default',
  },
  src: PropTypes.string,
  /** Srcset of image avatar */
  srcset: PropTypes.string,
  icon: PropTypes.VNodeChild,
  alt: PropTypes.string,
  gap: PropTypes.number,
  draggable: PropTypes.bool,
  loadError: {
    type: Function as PropType<() => boolean>,
  },
};

export type AvatarProps = Partial<ExtractPropTypes<typeof avatarProps>>;

const Avatar = defineComponent({
  name: 'AAvatar',
  props: avatarProps,
  setup(props, { slots, attrs }) {
    const isImgExist = ref(true);
    const isMounted = ref(false);
    const scale = ref(1);

    const avatarChildrenRef = ref<HTMLElement>(null);
    const avatarNodeRef = ref<HTMLElement>(null);

    const configProvider = inject('configProvider', defaultConfigProvider);

    const groupSize = inject('SizeProvider', 'default');

    const screens = useBreakpoint();
    const responsiveSizeStyle = computed(() => {
      if (typeof props.size !== 'object') {
        return {};
      }
      const currentBreakpoint: Breakpoint = responsiveArray.find(screen => screens.value[screen])!;
      const currentSize = props.size[currentBreakpoint];

      const hasIcon = !!getPropsSlot(slots, props, 'icon');
      return currentSize
        ? {
            width: `${currentSize}px`,
            height: `${currentSize}px`,
            lineHeight: `${currentSize}px`,
            fontSize: `${hasIcon ? currentSize / 2 : 18}px`,
          }
        : {};
    });

    const setScale = () => {
      if (!avatarChildrenRef.value || !avatarNodeRef.value) {
        return;
      }
      const childrenWidth = avatarChildrenRef.value.offsetWidth; // offsetWidth avoid affecting be transform scale
      const nodeWidth = avatarNodeRef.value.offsetWidth;
      // denominator is 0 is no meaning
      if (childrenWidth !== 0 && nodeWidth !== 0) {
        const { gap = 4 } = props;
        if (gap * 2 < nodeWidth) {
          scale.value =
            nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1;
        }
      }
    };

    const handleImgLoadError = () => {
      const { loadError } = props;
      const errorFlag = loadError?.();
      if (errorFlag !== false) {
        isImgExist.value = false;
      }
    };

    watch(
      () => props.src,
      () => {
        nextTick(() => {
          isImgExist.value = true;
          scale.value = 1;
        });
      },
    );

    onMounted(() => {
      nextTick(() => {
        setScale();
        isMounted.value = true;
      });
    });

    onUpdated(() => {
      nextTick(() => {
        setScale();
      });
    });

    return () => {
      const {
        prefixCls: customizePrefixCls,
        shape,
        size: customSize,
        src,
        alt,
        srcset,
        draggable,
      } = props;
      const icon = getPropsSlot(slots, props, 'icon');
      const getPrefixCls = configProvider.getPrefixCls;
      const prefixCls = getPrefixCls('avatar', customizePrefixCls);
      const size = customSize === 'default' ? unref(groupSize) : customSize;
      const classString = {
        [prefixCls]: true,
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-image`]: src && isImgExist.value,
        [`${prefixCls}-icon`]: icon,
      };

      const sizeStyle: CSSProperties =
        typeof size === 'number'
          ? {
              width: `${size}px`,
              height: `${size}px`,
              lineHeight: `${size}px`,
              fontSize: icon ? `${size / 2}px` : '18px',
            }
          : {};

      let children: VueNode = slots.default?.();
      if (src && isImgExist.value) {
        children = (
          <img
            draggable={draggable}
            src={src}
            srcset={srcset}
            onError={handleImgLoadError}
            alt={alt}
          />
        );
      } else if (icon) {
        children = icon;
      } else {
        const childrenNode = avatarChildrenRef.value;

        if (childrenNode || scale.value !== 1) {
          const transformString = `scale(${scale.value}) translateX(-50%)`;
          const childrenStyle: CSSProperties = {
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString,
          };
          const sizeChildrenStyle =
            typeof size === 'number'
              ? {
                  lineHeight: `${size}px`,
                }
              : {};
          children = (
            <span
              class={`${prefixCls}-string`}
              ref={avatarChildrenRef}
              style={{ ...sizeChildrenStyle, ...childrenStyle }}
            >
              {children}
            </span>
          );
        } else {
          children = (
            <span class={`${prefixCls}-string`} ref={avatarChildrenRef} style={{ opacity: 0 }}>
              {children}
            </span>
          );
        }
      }
      return (
        <span
          ref={avatarNodeRef}
          class={classString}
          style={{ ...sizeStyle, ...responsiveSizeStyle.value, ...(attrs.style as CSSProperties) }}
        >
          {children}
        </span>
      );
    };
  },
});

export default Avatar;
