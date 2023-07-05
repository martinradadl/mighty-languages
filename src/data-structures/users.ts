import { CourseType } from "./courses"


export interface UserType {
    id: number
    name: string
    "profile-pic": string 
    "courses-taken": Array<number>
    email: string
}