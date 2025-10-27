import { defineComponent, ref } from 'vue'
import FreestarAdSlot, { FreestarAdSlotProps } from '@bakkesplugins/pubfig-adslot-vue-component'

export default defineComponent({
  name: 'TypeScriptDemo',
  components: {
    FreestarAdSlot
  },
  setup() {
    const adRefresh = ref(0)
    
    // Type-safe props with full IntelliSense support
    const adSlotProps: Partial<FreestarAdSlotProps> = {
      publisher: 'your-publisher-id',
      placementName: 'header-banner',
      targeting: {
        category: 'sports',
        location: 'us',
        userType: 'premium'
      },
      channel: 'main-site',
      classList: ['custom-ad-class', 'responsive-ad'],
      adRefresh: adRefresh.value,
      slotId: 'unique-slot-123',
      adUnitPath: '/example/ad/unit/path',
      slotSize: '728x90',
      sizeMapping: '[[1024, 768], [[728, 90]]]'
    }
    
    // Type-safe event handlers
    const onNewAdSlot = (): void => {
      console.log('New ad slot created')
    }
    
    const onDeleteAdSlot = (): void => {
      console.log('Ad slot deleted')
    }
    
    const onAdRefresh = (): void => {
      adRefresh.value++
      console.log('Ad refreshed:', adRefresh.value)
    }
    
    // Using static methods with TypeScript
    const setTargeting = (key: string, value: any): void => {
      FreestarAdSlot.setPageTargeting(key, value)
    }
    
    const clearTargeting = (key: string): void => {
      FreestarAdSlot.clearPageTargeting(key)
    }
    
    const trackPageview = (): void => {
      FreestarAdSlot.trackPageview()
    }
    
    return {
      adSlotProps,
      onNewAdSlot,
      onDeleteAdSlot,
      onAdRefresh,
      setTargeting,
      clearTargeting,
      trackPageview
    }
  },
  template: `
    <div>
      <h1>TypeScript Demo</h1>
      <FreestarAdSlot
        v-bind="adSlotProps"
        :on-new-ad-slots-hook="onNewAdSlot"
        :on-delete-ad-slots-hook="onDeleteAdSlot"
        :on-ad-refresh-hook="onAdRefresh"
      />
      <button @click="onAdRefresh">Refresh Ad</button>
      <button @click="setTargeting('test', 'value')">Set Page Targeting</button>
      <button @click="clearTargeting('test')">Clear Page Targeting</button>
      <button @click="trackPageview">Track Pageview</button>
    </div>
  `
})