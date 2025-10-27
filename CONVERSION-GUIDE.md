# React to Vue 3 Conversion - API Compatibility Guide

This document demonstrates the 1:1 conversion from React to Vue 3, ensuring all APIs, methods, and hooks work exactly the same.

## Component API Comparison

### React Version (Original)
```jsx
<FreestarAdSlot
  publisher="publisherName"
  placementName="PublisherName_970x250_728x90_320x50"
  slotId="custom_slot_id"
  targeting={{ key1: 'value1', key2: 'value2' }}
  channel='custom_channel'
  classList={['m-30', 'p-15', 'b-thin-red']}
  adRefresh={adRefreshCounter}
  onNewAdSlotsHook={(placementName) => console.log('creating ad', placementName)}
  onDeleteAdSlotsHook={(placementName) => console.log('destroying ad', placementName)}
  onAdRefreshHook={(placementName) => console.log('refreshing ad', placementName)}
  adUnitPath="/custom/ad/unit/path"
  slotSize={[300, 250]}
  sizeMapping={[
    { viewport: [1024, 768], slot: [728, 90] },
    { viewport: [0, 0], slot: [300, 250] }
  ]}
  keyValueConfigMappingURL="https://example.com/mapping.json"
  queue={false}
  integrity="sha384-..."
/>
```

### Vue 3 Version (Converted)
```vue
<FreestarAdSlot
  publisher="publisherName"
  placementName="PublisherName_970x250_728x90_320x50"
  slotId="custom_slot_id"
  :targeting="{ key1: 'value1', key2: 'value2' }"
  channel="custom_channel"
  :classList="['m-30', 'p-15', 'b-thin-red']"
  :adRefresh="adRefreshCounter"
  :onNewAdSlotsHook="(placementName) => console.log('creating ad', placementName)"
  :onDeleteAdSlotsHook="(placementName) => console.log('destroying ad', placementName)"
  :onAdRefreshHook="(placementName) => console.log('refreshing ad', placementName)"
  adUnitPath="/custom/ad/unit/path"
  :slotSize="[300, 250]"
  :sizeMapping="[
    { viewport: [1024, 768], slot: [728, 90] },
    { viewport: [0, 0], slot: [300, 250] }
  ]"
  keyValueConfigMappingURL="https://example.com/mapping.json"
  :queue="false"
  integrity="sha384-..."
/>
```

**Key Differences:**
- Vue uses `:` prefix for dynamic bindings (objects, arrays, numbers, booleans)
- String literals can be passed without `:` prefix
- Function props need `:` prefix in Vue

## Props Compatibility

All props are supported with identical types and defaults:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| publisher | String | Yes | '' | Publisher identifier |
| placementName | String | Yes | '' | Ad unit placement name |
| slotId | String | No | null | Custom element ID |
| targeting | Object | No | {} | Key/value targeting pairs |
| channel | String | No | null | Custom channel |
| classList | Array | No | [] | Additional CSS classes |
| adRefresh | Number | No | 0 | Increment to trigger refresh |
| onNewAdSlotsHook | Function | No | () => {} | Called when ad is created |
| onDeleteAdSlotsHook | Function | No | () => {} | Called when ad is destroyed |
| onAdRefreshHook | Function | No | () => {} | Called when ad is refreshed |
| adUnitPath | String | No | null | Direct GAM ad unit path |
| slotSize | Array/String | No | null | Ad slot size |
| sizeMapping | Array | No | null | Responsive size mapping |
| keyValueConfigMappingURL | String | No | null | Mapping config URL |
| queue | Boolean | No | false | Queue ad calls |
| integrity | String | No | null | SRI integrity hash |

## Static Methods

All static methods are preserved with identical signatures:

### React
```javascript
import FreestarAdSlot from '@freestar/pubfig-adslot-react-component'

FreestarAdSlot.setPageTargeting('key', 'value')
FreestarAdSlot.clearPageTargeting('key')
FreestarAdSlot.trackPageview()
FreestarAdSlot.queueAdCalls(true)
FreestarAdSlot.releaseQueuedAds()
```

### Vue 3
```javascript
import FreestarAdSlot from '@freestar/pubfig-adslot-vue-component'

FreestarAdSlot.setPageTargeting('key', 'value')
FreestarAdSlot.clearPageTargeting('key')
FreestarAdSlot.trackPageview()
FreestarAdSlot.queueAdCalls(true)
FreestarAdSlot.releaseQueuedAds()
```

**Identical API** - No changes required when calling static methods.

## Lifecycle Mapping

| React Lifecycle | Vue 3 Equivalent | Implementation |
|----------------|------------------|----------------|
| componentDidMount | onMounted | Async initialization, ad creation |
| componentWillUnmount | onUnmounted | Ad slot cleanup |
| componentDidUpdate (adRefresh) | watch(() => props.adRefresh) | Ad refresh on prop change |
| componentDidUpdate (channel) | watch(() => props.channel) | New ad on channel change |

## Internal State

| React State | Vue 3 Equivalent |
|-------------|------------------|
| this.state.placementName | ref(mappedPlacementName) |
| this.state.slotId | ref(elementId) |
| this.classes() | computed(() => classes) |

## Behavior Compatibility

### 1. Initialization
- ✅ Identical: Calls Freestar.init() with publisher, keyValueConfigMappingURL, and integrity
- ✅ Identical: Maps placement name using Freestar.getMappedPlacementName()
- ✅ Identical: Creates ad slot with Freestar.newAdSlot()

### 2. Cleanup
- ✅ Identical: Destroys ad slot using Freestar.deleteAdSlot() on unmount

### 3. Refresh Handling
- ✅ Identical: Watches adRefresh prop and calls Freestar.refreshAdSlot() when changed

### 4. Channel Changes
- ✅ Identical: Watches channel prop and creates new ad when changed

### 5. Static Methods
- ✅ Identical: All static methods proxy to Freestar wrapper

### 6. Rendering
- ✅ Identical: Renders wrapper div with nested div containing id and classes

## Freestar Wrapper

The `freestarWrapper.js` file is **unchanged** - it's pure JavaScript with no React/Vue dependencies, ensuring identical behavior across both implementations.

## Migration Guide

### For React Users
Replace package:
```bash
npm uninstall @freestar/pubfig-adslot-react-component
npm install @freestar/pubfig-adslot-vue-component
```

Update imports:
```javascript
// Old
import FreestarAdSlot from '@freestar/pubfig-adslot-react-component'

// New
import FreestarAdSlot from '@freestar/pubfig-adslot-vue-component'
```

Update template syntax:
- Add `:` prefix for object/array/number/boolean props
- Keep string literals without prefix
- Static methods require no changes

### Example Migration

**Before (React):**
```jsx
import React, { useState } from 'react'
import FreestarAdSlot from '@freestar/pubfig-adslot-react-component'

function MyComponent() {
  const [adRefresh, setAdRefresh] = useState(0)
  
  return (
    <FreestarAdSlot
      publisher="myPub"
      placementName="myPlacement"
      adRefresh={adRefresh}
      classList={['ad-class']}
    />
  )
}
```

**After (Vue 3):**
```vue
<script setup>
import { ref } from 'vue'
import FreestarAdSlot from '@freestar/pubfig-adslot-vue-component'

const adRefresh = ref(0)
</script>

<template>
  <FreestarAdSlot
    publisher="myPub"
    placementName="myPlacement"
    :adRefresh="adRefresh"
    :classList="['ad-class']"
  />
</template>
```

## Testing

Run the API validation:
```bash
npm run validate
```

This validates:
- ✅ All static methods are present
- ✅ Vue 3 Composition API is used
- ✅ Component structure is correct
- ✅ Freestar wrapper integration is complete

## Conclusion

The Vue 3 conversion maintains **100% API compatibility** with the React version. All features, methods, and behaviors work identically, making it a true 1:1 conversion suitable for production use.
