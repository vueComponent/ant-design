import { mount } from '@vue/test-utils'
import Spin from '..'

describe('Spin', () => {
  it('should only affect the spin element when set style to a nested <Spin>xx</Spin>', () => {
    const wrapper = mount({
      render () {
        return (
          <Spin style={{ background: 'red' }}>
            <div>content</div>
          </Spin>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    // expect(wrapper.findAll('.ant-spin-nested-loading').at(0).prop('style')).toBe(null)
    // expect(wrapper.findAll('.ant-spin').at(0).prop('style').background).toBe('red')
  })

  it('should render custom indicator when it\'s set', () => {
    // const customIndicator = <div className='custom-indicator' />
    const wrapper = mount(
      {
        render () {
          return (
            <Spin><div slot='indicator' class='custom-indicator' /></Spin>
          )
        },
      })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
