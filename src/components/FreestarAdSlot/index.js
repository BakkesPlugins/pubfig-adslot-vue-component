import { defineComponent, ref, computed, onMounted, onUnmounted, watch, h } from 'vue'
import Freestar from './freestarWrapper'

const FreestarAdSlot = defineComponent({
  name: 'FreestarAdSlot',
  props: {
    publisher: {
      type: String,
      required: true,
      default: ''
    },
    placementName: {
      type: String,
      required: true,
      default: ''
    },
    slotId: {
      type: String,
      default: null
    },
    targeting: {
      type: Object,
      default: () => ({})
    },
    channel: {
      type: String,
      default: null
    },
    classList: {
      type: Array,
      default: () => []
    },
    adRefresh: {
      type: Number,
      default: 0
    },
    onNewAdSlotsHook: {
      type: Function,
      default: () => {}
    },
    onDeleteAdSlotsHook: {
      type: Function,
      default: () => {}
    },
    onAdRefreshHook: {
      type: Function,
      default: () => {}
    },
    adUnitPath: {
      type: String,
      default: null
    },
    slotSize: {
      type: [Array, String],
      default: null
    },
    sizeMapping: {
      type: Array,
      default: null,
      validator: (value) => {
        if (!value) return true
        return value.every(item => 
          item && 
          Array.isArray(item.viewport) && 
          Array.isArray(item.slot)
        )
      }
    },
    keyValueConfigMappingURL: {
      type: String,
      default: null
    },
    queue: {
      type: Boolean,
      default: false
    },
    integrity: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const elementId = ref(props.slotId || props.placementName)
    const mappedPlacementName = ref(props.placementName)

    const classes = computed(() => {
      return props.classList ? props.classList.join(' ') : ''
    })

    onMounted(async () => {
      const {
        adUnitPath,
        slotSize,
        sizeMapping,
        placementName,
        onNewAdSlotsHook,
        channel,
        targeting,
        keyValueConfigMappingURL,
        publisher,
        integrity
      } = props

      await Freestar.init(publisher, keyValueConfigMappingURL, integrity)
      const mapped = await Freestar.getMappedPlacementName(placementName, targeting)
      mappedPlacementName.value = mapped
      Freestar.newAdSlot(mapped, elementId.value, onNewAdSlotsHook, channel, targeting, adUnitPath, slotSize, sizeMapping)
    })

    onUnmounted(() => {
      const { placementName, onDeleteAdSlotsHook, targeting, adUnitPath } = props
      Freestar.deleteAdSlot(placementName, elementId.value, targeting, onDeleteAdSlotsHook, adUnitPath)
    })

    // Watch for adRefresh changes
    watch(() => props.adRefresh, (newVal, oldVal) => {
      if (newVal !== oldVal && oldVal !== undefined) {
        const { placementName, onAdRefreshHook, targeting, adUnitPath } = props
        Freestar.refreshAdSlot(placementName, elementId.value, targeting, onAdRefreshHook, adUnitPath)
      }
    })

    // Watch for channel changes
    watch(() => props.channel, (newVal, oldVal) => {
      if (newVal !== oldVal && oldVal !== undefined) {
        const { placementName, onNewAdSlotsHook, targeting, adUnitPath, slotSize, sizeMapping } = props
        Freestar.newAdSlot(placementName, elementId.value, onNewAdSlotsHook, newVal, targeting, adUnitPath, slotSize, sizeMapping)
      }
    })

    return {
      elementId,
      classes
    }
  },
  render() {
    return h('div', [
      h('div', {
        class: this.classes,
        id: this.elementId
      })
    ])
  }
})

// Static methods
FreestarAdSlot.setPageTargeting = (key, value) => {
  Freestar.setPageTargeting(key, value)
}

FreestarAdSlot.clearPageTargeting = (key) => {
  Freestar.clearPageTargeting(key)
}

FreestarAdSlot.trackPageview = () => {
  Freestar.trackPageview()
}

FreestarAdSlot.queueAdCalls = (queue) => {
  Freestar.queueAdCalls(queue)
}

FreestarAdSlot.releaseQueuedAds = () => {
  Freestar.flushQueuedNewAdSlots()
}

export default FreestarAdSlot
