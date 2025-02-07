'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import * as dateFns from 'date-fns'
import { ko } from 'date-fns/locale'
import { IPost, MOCK_POSTS } from '@/utils/MockData'

interface IComment {
  id: string
  content: string
  userName: string
  userImage?: string
}

// 목업 댓글 데이터
const MOCK_COMMENTS: IComment[] = [
  {
    id: '1',
    content: '정말 망할 작품이네요! 최악이에요 프롬프트 공유 해주실 수 있나요?',
    userName: '댓글러1',
  },
  {
    id: '2',
    content: '색감이 너무 예쁘네요. 어떤 설정으로 생성하셨나요?',
    userName: '댓글러2',
  },
  {
    id: '3',
    content: '분위기가 정말 좋아요 좋긴 멀 좋아 최악입니다. 이따구로 할꺼면 때려 치우세요! 저도 한번 시도해보고 싶네요.',
    userName: '댓글러3',
  }
]

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<IPost | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [comments, setComments] = useState<IComment[]>(MOCK_COMMENTS)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const foundPost = MOCK_POSTS.find(p => p.id === params.id)
    if (foundPost) {
      setPost(foundPost)
      setLikesCount(foundPost.likes)
    }
  }, [params.id])

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj: IComment = {
      id: Date.now().toString(),
      content: newComment,
      userName: '현재 사용자',
    }

    setComments(prev => [newCommentObj, ...prev])
    setNewComment('')
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">로딩중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/5">
      <div className="container max-w-5xl py-6 px-4 md:py-8 md:px-6 mx-auto">
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            갤러리로 돌아가기
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-background rounded-lg shadow-sm">
          <div className="lg:sticky lg:top-6 h-fit">
            <Card className="overflow-hidden bg-muted/10">
              <CardContent className="p-0">
                <div className="relative w-full h-auto" style={{ paddingTop: '100%' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={post.imageUrl}
                      alt={post.prompt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                  <AvatarFallback className="bg-primary/5">{post.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">{post.userName}</div>
                  <div className="text-sm text-muted-foreground">AI 아티스트</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">프롬프트</h2>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                  {post.prompt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="lg"
                onClick={handleLikeClick}
                className="flex-1"
              >
                <Heart 
                  className={cn(
                    "h-5 w-5 mr-2",
                    isLiked && "fill-current text-red-500"
                  )} 
                />
                좋아요 {likesCount}
              </Button>
              <Button variant="ghost" size="lg" className="flex-1">
                <MessageCircle className="h-5 w-5 mr-2" />
                댓글 {comments.length}
              </Button>
              <Button variant="ghost" size="lg" className="flex-1">
                <Share2 className="h-5 w-5 mr-2" />
                공유하기
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">댓글 {comments.length}개</h3>
              </div>
              <div className="space-y-6 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="group">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-primary/5">
                          {comment.userName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.userName}</span>
                        </div>
                        <div className="bg-muted/20 rounded-lg p-3">
                          <p className="text-sm text-foreground/90 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/10 rounded-lg p-4">
                <form onSubmit={handleCommentSubmit} className="space-y-3">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="작품에 대한 의견을 남겨주세요..."
                    className="resize-none bg-background"
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!newComment.trim()}>
                      댓글 작성
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 