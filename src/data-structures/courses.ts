import { LessonType } from "./lessons"

export interface CourseType {
    id: number
    title: string
    description: string
    lessons: Array<LessonType>
    rating: number
}