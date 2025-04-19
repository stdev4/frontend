import { Link } from '@tanstack/react-router'

export default function BigButton({
  title,
  description,
  to,
}: {
  title: string
  description: string
  to: string
}) {
  return (
    <>
      <Link to={to}>
        <button className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg border p-4 py-12">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </button>
      </Link>
    </>
  )
}
