
export interface GitHubUserType {
    id: number,
    login: string,
    name: string,
    avatar_url: string,
    blog?: string,
    company?: string,
    bio?: string,
    location?: string,
    twitter_username?: string,
    public_repos: number,
    total_private_repos: number,
    followers: number,
    following: number
    created_at: Date,
}
