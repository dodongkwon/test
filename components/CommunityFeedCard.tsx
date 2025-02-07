'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CommentModal } from '@/components/CommentModal'
import { cn } from '@/lib/utils'
import { IPost } from '@/utils/MockData'
import { ICommunityFeedCardProps } from '@/types'

// 목업 댓글 데이터
const MOCK_COMMENTS = [
  {
    id: '1',
    content: '정말 멋진 작품이네요!',
    userName: '댓글러1',
  },
  {
    id: '2',
    content: '어떤 프롬프트를 사용하셨나요?',
    userName: '댓글러2',
  },
]

export function CommunityFeedCard({ post }: ICommunityFeedCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [comments, setComments] = useState(MOCK_COMMENTS)

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCommentModalOpen(true)
  }

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now().toString(),
      content,
      userName: '현재 사용자',
    }
    setComments(prev => [...prev, newComment])
  }

  return (
    <>
      <Link href={`/post/${post.id}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0 relative aspect-square">
            <Image
              src={post.imageUrl}
              alt={post.prompt}
              fill
              className="object-cover"
            />
          </CardContent>
          <CardFooter className="p-4">
            <div className="w-full">
              {/* 작성자 정보 */}
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium">{post.userName}</div>
              </div>
              
              {/* 프롬프트 텍스트 */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {post.prompt}
              </p>

              {/* 좋아요 & 댓글 버튼 */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 px-2 hover:bg-background"
                  onClick={handleLikeClick}
                >
                  <Heart 
                    className={cn(
                      "w-6 h-6 mr-1",
                      isLiked && "fill-current text-red-500"
                    )} 
                  />
                  <span className="text-sm font-medium">{likesCount}</span>
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="h-9 px-2 hover:bg-background"
                  onClick={handleCommentClick}
                >
                  <MessageCircle className="w-6 h-6 mr-1" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postId={post.id}
        comments={comments}
        onAddComment={handleAddComment}
      />
    </>
  )
} 