export interface IPost {
  id: string
  imageUrl: string
  userName: string
  likes: number
  comments: number
  prompt: string
}

export interface IComment {
  id: string
  content: string
  userName: string
  userImage?: string
}

export interface ICommentModalProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  comments: IComment[]
  onAddComment: (comment: string) => void
}

export interface ICommunityFeedProps {
  posts: IPost[]
}

export interface ICommunityFeedCardProps {
  post: IPost
} 