import {Post} from '@domain/models/post';

export interface ListPost {
    listPost(paginate: PaginationParams): Promise<Post[]>
}

export type PaginationParams = {
    limit: number
    page: number
}

