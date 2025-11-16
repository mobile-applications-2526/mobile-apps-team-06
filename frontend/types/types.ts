export type Recipe = {
    id: string,
    title: string,
    description: string,
    difficulty: string,
    createdAt: Date,
    prepare_time: number,
    ingredients: string[],
    steps: string,
    tags: string[],
    poster: Profile,
    coverImageURL: string,
    favorites: Set<Profile>
}

export type User = {
    id: string,
    username: string,
    email: string,
    createdAt: Date,
    profile: Profile,
    role: Role
}

export type Profile = {
    id: string,
    createdAt: Date,
    bio: string,
    isPrivate: boolean,
    user: User,
    favorites: Set<Recipe>,
    posts: Set<Recipe>
}

export type LoggedInUser = {
    token: string,
    username: string,
    role: Role
}

export type UserSignupInput = {
    username: string,
    email: string,
    password: string
}

export type UserLoginInput = {
    email: string,
    password: string
}

export type Role = "USER" | "ADMIN"