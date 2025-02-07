'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'



export function PromptInput() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "프롬프트를 입력해주세요",
        description: "이미지 생성을 위해 프롬프트 입력이 필요합니다.",
      })
      return
    }

    setIsLoading(true)
    
    // 목업: 실제 API 연동 대신 타이머 사용
    setTimeout(() => {
      router.push(`/generate?prompt=${encodeURIComponent(prompt)}`)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="원하는 이미지를 설명해주세요..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="max-w-xl mx-auto text-lg"
      />
      <Button 
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-40"
      >
        {isLoading ? '처리중...' : '이미지 생성'}
      </Button>
    </form>
  )
} 