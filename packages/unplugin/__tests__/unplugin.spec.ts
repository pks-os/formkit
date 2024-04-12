import { describe, it } from 'vitest'
import { getTransformedSource } from '../../../.tests/viteSpy'
import { resolvePathSync } from 'mlly'
import { mount } from '@vue/test-utils'

describe('vite plugin transform', () => {
  it('has transformed the code', async ({ expect }) => {
    const path = resolvePathSync('./fixtures/SimpleRender.vue', {
      url: import.meta.url,
    })
    const SimpleRender = (await import('./fixtures/SimpleRender.vue')).default
    expect(getTransformedSource(path)).toMatchInlineSnapshot(`
      "import { bindings } from "@formkit/vue";
      import { FormKit } from "@formkit/vue";
      const _sfc_main = {};
      import { resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
      function _sfc_render(_ctx, _cache) {
        const _component_FormKit = FormKit;
        return _openBlock(), _createElementBlock("div", null, [_createVNode(_component_FormKit, {
          type: "text",
          __config__: {
            plugins: [bindings]
          }
        }), _createVNode(_component_FormKit, {
          __config__: {
            plugins: [bindings]
          }
        })]);
      }
      import _export_sfc from ' plugin-vue:export-helper';
      export default /*#__PURE__*/_export_sfc(_sfc_main, [['render', _sfc_render], ['__file', "/Users/justinschroeder/Projects/formkit/packages/unplugin/__tests__/fixtures/SimpleRender.vue"]]);"
    `)
    expect(mount(SimpleRender).html()).toBe('123123')
  })
})
