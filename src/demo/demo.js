import { defineComponent, ref, h } from 'vue'
import FreestarAdSlot from '../components/FreestarAdSlot/index'
import './demo.css'

export default defineComponent({
  name: 'Demo',
  components: {
    FreestarAdSlot
  },
  setup() {
    const adRefresh = ref(0)

    const onAdRefresh = () => {
      adRefresh.value++
    }

    const placementName = 'PublisherName_970x250_728x90_320x50'
    const publisher = 'publisherName'
    const targeting = { key1: 'value1', key2: 'value2' }

    return {
      placementName,
      publisher,
      targeting,
      adRefresh,
      onAdRefresh
    }
  },
  render() {
    return h('div', [
      h(FreestarAdSlot, {
        publisher: this.publisher,
        placementName: this.placementName,
        targeting: this.targeting,
        channel: 'custom_channel',
        classList: ['m-30', 'p-15', 'b-thin-red'],
        adRefresh: this.adRefresh,
        onNewAdSlotsHook: (placementName) => console.log('creating ad', placementName),
        onDeleteAdSlotsHook: (placementName) => console.log('destroying ad', placementName),
        onAdRefreshHook: (placementName) => console.log('refreshing ad', placementName)
      }),
      h('button', { onClick: this.onAdRefresh }, 'Trigger Refresh')
    ])
  }
})
