import {Post} from '@data/models/post';

export interface ListPost {
    listPost(paginate: PaginationParams): Promise<Post[]>
}

export type PaginationParams = {
    limit: number
    page: number
}

