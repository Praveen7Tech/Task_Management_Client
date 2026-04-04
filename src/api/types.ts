import type { User } from "../app/slices/auth.slice"

export interface RegisterData{
    name: string
    email: string
    password: string
}
export interface RegisterReponse{
    message: string
    user: User
}

