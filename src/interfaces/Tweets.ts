export default interface Tweet {
    _id: number,
    postedBy: {
        _id: number,
        name: string,
        avatar: string,
        email: string,
        followers: [],
        following: [] 
    }, 
    text: string,
    tags: [string],
    likes: []
}