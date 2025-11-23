export type Recipe = {
    id: Id,
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
    favorites: Profile[]
}
// Type purely because the JSON object for the different types is {id: {id: string}}
export type Id = {
    id: string;
}

export type User = {
    id: Id,
    username: string,
    email: string,
    createdAt: Date,
    profile: Profile,
    role: Role
}

export type Profile = {
    id: Id,
    createdAt: Date,
    bio: string,
    isPrivate: boolean,
    user: User,
    favorites: Recipe[],
    posts: Recipe[]
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