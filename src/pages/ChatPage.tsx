import { Link } from '@tanstack/react-router'

export function ChatPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">과학자들과 대화</h1>
      {/* 뉴턴 */}
      <SelectScientistButton
        name="뉴턴"
        image="https://placehold.co/"
        description="사과가 떨어지는 걸 보고 세상 모든 물건이 끌어당기는 힘이 있다는 걸 알아낸 과학자"
      />
      {/* 마리 퀴리 */}
      <SelectScientistButton
        name="마리 퀴리"
        image="https://placehold.co/"
        description="눈에 보이지 않는 방사능이라는 힘을 발견한 용감한 과학자"
      />
      {/* 아인슈타인 */}
      <SelectScientistButton
        name="아인슈타인"
        image="https://placehold.co/"
        description="시간과 공간이 늘어나거나 줄어들 수 있다는 걸 알아낸 천재 과학자"
      />
    </div>
  )
}

export function SelectScientistButton({
  name,
  image,
  description,
}: {
  name: string
  image: string
  description: string
}) {
  return (
    <Link
      to="/chat/$scientist"
      params={{ scientist: name }}
      className="block cursor-pointer"
    >
      <button className="flex w-full items-center justify-center gap-10 rounded-lg border p-8">
        <div className="size-24 overflow-hidden rounded-full">
          <img src={image} alt={name} className="h-24 w-24" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </button>
    </Link>
  )
}
