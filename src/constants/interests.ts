export const INTERESTS = {
  PHYSICS: '물리학',
  CHEMISTRY: '화학',
  BIOLOGY: '생물학',
  GEOSCIENCE: '지구과학',
  ASTRONOMY: '천문학',
  OTHERS: '기타',
} as const

export type InterestKey = keyof typeof INTERESTS
export type InterestValue = (typeof INTERESTS)[InterestKey]

export const INTEREST_LIST = Object.entries(INTERESTS).map(([key, value]) => ({
  key: key as InterestKey,
  value,
}))
