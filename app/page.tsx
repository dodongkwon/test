import { PromptInput } from '@/components/PromptInput'
import { CommunityFeed } from '@/components/CommunityFeed'
import { MOCK_POSTS } from '@/utils/MockData'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* 프롬프트 입력 섹션 */}
      <section className="max-w-2xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-6">AI로 이미지를 생성해보세요</h1>
        <p className="text-gray-600 mb-8">
          간단한 프롬프트로 원하는 이미지를 만들어보세요
        </p>
        <PromptInput />
      </section>

      {/* 커뮤니티 피드 섹션 */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">커뮤니티 피드</h2>
        <CommunityFeed posts={MOCK_POSTS} />
      </section>
    </main>
  )
}
