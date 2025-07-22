'use client'

import { useRouter } from 'next/navigation'

type Props = {
  path: string
  titles: string
}

const NextPage = ({ path, titles }: Props) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(path)}
      className="text-purple-600 underline-offset-4 text-xl hover:underline hover:font-semibold transition-all duration-200 ease-in-out"
    >
      {titles}
    </button>
  )
}

export default NextPage
