
import { Post } from "@prisma/client"

type PostWithData = (Post & {
    topic: {slug : string},
    user: {name : string | null},
    _comments: {count: number}
})