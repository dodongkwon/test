export interface IPost {
  id: string
  imageUrl: string
  userName: string
  likes: number
  comments: number
  prompt: string
}

export const MOCK_POSTS: IPost[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/post1/400/400',
    userName: '창작자1',
    likes: 120,
    comments: 15,
    prompt: '우주를 나는 고양이'
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/post2/400/400',
    userName: '창작자2',
    likes: 84,
    comments: 9,
    prompt: '바다 속 인어공주'
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/seed/post3/400/400',
    userName: '창작자3',
    likes: 156,
    comments: 23,
    prompt: '미래도시의 풍경'
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/seed/post4/400/400',
    userName: '창작자4',
    likes: 92,
    comments: 12,
    prompt: '판타지 정원'
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/seed/post5/400/400',
    userName: '창작자5',
    likes: 245,
    comments: 31,
    prompt: '사이버펑크 도시'
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/seed/post6/400/400',
    userName: '창작자6',
    likes: 167,
    comments: 19,
    prompt: '마법사의 연구실'
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/seed/post7/400/400',
    userName: '창작자7',
    likes: 134,
    comments: 17,
    prompt: '동화 속 성'
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/seed/post8/400/400',
    userName: '창작자8',
    likes: 198,
    comments: 25,
    prompt: '우주 정거장'
  },
  {
    id: '9',
    imageUrl: 'https://picsum.photos/seed/post9/400/400',
    userName: '창작자9',
    likes: 176,
    comments: 21,
    prompt: '신비한 숲속'
  },
  {
    id: '10',
    imageUrl: 'https://picsum.photos/seed/post10/400/400',
    userName: '창작자10',
    likes: 223,
    comments: 28,
    prompt: '로봇과 인간'
  }
] 