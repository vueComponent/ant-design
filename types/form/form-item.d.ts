// Type definitions for Ant Design Vue 1.2.2
// Project: https://github.com/vueComponent/ant-design-vue
// Definitions by: akki-jat <https://github.com/akki-jat>
// Definitions: https://github.com/vueComponent/ant-design-vue/types

import { AntdComponent } from "../component";
import { Col } from "../grid/col";

export declare class FormItem extends AntdComponent {
  /**
   * Used with label, whether to display : after label text.
   * @default true
   * @type boolean
   */
  colon: boolean;

  /**
   * The extra prompt message. It is similar to help. Usage example: to display error message and prompt message at the same time.
   * @type any (string | slot)
   */
  extra: any;

  /**
   * Used with validateStatus, this option specifies the validation status icon. Recommended to be used only with Input.
   * @default false
   * @type boolean
   */
  hasFeedback: boolean;

  /**
   * The prompt message. If not provided, the prompt message will be generated by the validation rule.
   * @type any (string | slot)
   */
  help: any;

  /**
   * Label test
   * @type any (string | slot)
   */
  label: any;

  /**
   * The layout of label. You can set span offset to something like {span: 3, offset: 12} or sm: {span: 3, offset: 12} same as with <Col>
   * @type Col
   */
  labelCol: Col;

  /**
   * Whether provided or not, it will be generated by the validation rule.
   * @default false
   * @type boolean
   */
  required: boolean;

  /**
   * The validation status. If not provided, it will be generated by validation rule. options: 'success' 'warning' 'error' 'validating'
   * @type string
   */
  validateStatus: "" | "success" | "warning" | "error" | "validating";

  /**
   * The layout for input controls, same as labelCol
   * @type Col
   */
  wrapperCol: Col;
}
