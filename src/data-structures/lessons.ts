import { QuestionType } from "./questions"
import { UserType } from "./users"

export interface LessonType {
    id: number
    title: string
    videos: string
    quiz: Array<QuestionType>
    comments: Array<CommentType>
}


interface CommentType  {
    id: number
    user: UserType
    comment: string
    likes: number
    dislikes: number
    replies?: Array<CommentType>
}
