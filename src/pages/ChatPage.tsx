import { Link } from '@tanstack/react-router'

export function ChatPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">과학자들과 대화</h1>
      {/* 뉴턴 */}
      <SelectScientistButton
        name="뉴턴"
        image="https://placehold.co/"
        description="뉴턴은 뉴턴의 운동 법칙을 발표한 과학자입니다."
      />
      {/* 마리 퀴리 */}
      <SelectScientistButton
        name="마리 퀴리"
        image="https://placehold.co/"
        description="마리 퀴리는 퀴리 효과를 발견한 과학자입니다."
      />
      {/* 아인슈타인 */}
      <SelectScientistButton
        name="아인슈타인"
        image="https://placehold.co/"
        description="아인슈타인은 상대성 이론을 발표한 과학자입니다."
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
    <Link to="/chat/$scientist" params={{ scientist: name }} className="block">
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
