import { Types } from 'mongoose'

export default interface Tweet {
    _id: Types.ObjectId,
    postedBy: Types.ObjectId, 
    text: string,
    tags: [string],
    likes: [Types.ObjectId]
}