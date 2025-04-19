import { Link } from '@tanstack/react-router'
import { SCIENTISTS, type ScientistId } from '@/constants/scientists'

export function ChatPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">과학자들과 대화</h1>
      {SCIENTISTS.map(scientist => (
        <SelectScientistButton
          key={scientist.id}
          id={scientist.id}
          name={scientist.name}
          image={scientist.image}
          description={scientist.description}
        />
      ))}
    </div>
  )
}

interface SelectScientistButtonProps {
  id: ScientistId
  name: string
  image: string
  description: string
}

export function SelectScientistButton({
  id,
  name,
  image,
  description,
}: SelectScientistButtonProps) {
  return (
    <Link
      to="/chat/$scientist"
      params={{ scientist: id }}
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
