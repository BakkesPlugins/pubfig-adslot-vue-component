import { DefineComponent } from 'vue'

export interface FreestarAdSlotProps {
  publisher: string
  placementName: string
  slotId?: string | null
  targeting?: Record<string, any>
  channel?: string | null
  classList?: string[]
  adRefresh?: number
  onNewAdSlotsHook?: () => void
  onDeleteAdSlotsHook?: () => void
  onAdRefreshHook?: () => void
  adUnitPath?: string | null
  slotSize?: string | null
  sizeMapping?: string | null
  keyValueConfigMappingURL?: string | null
  integrity?: string | null
}

export interface FreestarAdSlotMethods {
  setPageTargeting: (key: string, value: any) => void
  clearPageTargeting: (key: string) => void
  trackPageview: () => void
  queueAdCalls: (queue: boolean) => void
  releaseQueuedAds: () => void
}

export type FreestarAdSlotComponent = DefineComponent<FreestarAdSlotProps> & FreestarAdSlotMethods

declare const FreestarAdSlot: FreestarAdSlotComponent

export default FreestarAdSlot