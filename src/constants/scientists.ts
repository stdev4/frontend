import einstein from '@/assets/einstein.png'
import newton from '@/assets/newton.png'
import curie from '@/assets/curie.png'


export const SCIENTISTS = [
  {
    id: 'newton',
    name: '뉴턴',
    image: newton,
    description:
      '사과가 떨어지는 걸 보고 세상 모든 물건이 끌어당기는 힘이 있다는 걸 알아낸 과학자',
  },
  {
    id: 'curie',
    name: '마리 퀴리',
    image: curie,
    description: '눈에 보이지 않는 방사능이라는 힘을 발견한 용감한 과학자',
  },
  {
    id: 'einstein',
    name: '아인슈타인',
    image: einstein,
    description:
      '시간과 공간이 늘어나거나 줄어들 수 있다는 걸 알아낸 천재 과학자',
  },
] as const

export type ScientistId = (typeof SCIENTISTS)[number]['id']
