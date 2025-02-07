'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { IComment, ICommentModalProps } from '@/types'

export function CommentModal({ isOpen, onClose, postId, comments, onAddComment }: ICommentModalProps) {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-center">댓글</DialogTitle>
        </DialogHeader>

        {/* 댓글 목록 */}
        <ScrollArea className="flex-1 px-6">
          {comments.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              첫 번째 댓글을 작성해보세요!
            </div>
          ) : (
            <div className="py-4 space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 group">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.userImage} />
                    <AvatarFallback className="text-xs">
                      {comment.userName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {comment.userName}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />

        {/* 댓글 입력 폼 */}
        <div className="p-4 bg-muted/50">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="resize-none border-muted-foreground/20"
              rows={3}
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!newComment.trim()}
                size="sm"
              >
                댓글 작성
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
} 