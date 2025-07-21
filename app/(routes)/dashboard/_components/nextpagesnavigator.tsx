'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  path: string
}

const Nextpage = ({ path }: Props) => {
  const router = useRouter()

  return (
    <div>
      <button
        onClick={() => router.push(path)}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Check Your Emotions
      </button>
    </div>
  )
}

export default Nextpage
