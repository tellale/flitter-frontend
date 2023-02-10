export default interface User {
    _id: number,
    name: string, 
    email: string,
    avatar: string,
    passwordHash: string,
    followers: [],
    following: [],
    date: Date
}