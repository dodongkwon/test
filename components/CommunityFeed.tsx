'use client'

import { useEffect, useState } from 'react'
import { CommunityFeedCard } from '@/components/CommunityFeedCard'
import { Skeleton } from '@/components/ui/skeleton'
import { IPost, MOCK_POSTS } from '@/utils/MockData'
import { ICommunityFeedProps } from '@/types'

export function CommunityFeed({ posts }: ICommunityFeedProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 목업: API 호출 대신 타이머로 데이터 로드
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <CommunityFeedCard key={post.id} post={post} />
      ))}
    </div>
  )
} 