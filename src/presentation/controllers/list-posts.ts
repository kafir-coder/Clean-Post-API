/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {ListPostUsecase} from '@domain/usecase/list-posts';
import {EmptyParamError, MissingParamError, ServerError} from '../errors/';
import {badRequest, ok, serverError} from '../helpers/http-helpers';
import {Controller} from '../protocols/controller';
import {HttpResponse} from '../protocols/http';


export class ListPost implements Controller {
  constructor(
    private readonly listPost: ListPostUsecase,
  ) {}
  async handle(request: QueryParameter): Promise<HttpResponse> {
    try {
      if (!request) {
        return badRequest(new MissingParamError('request'));
      }

      if (Object.entries(request).length === 0) {
        return badRequest(new MissingParamError('request.query'));
      }

      if (Object.entries(request['query']).length === 0) {
        return badRequest(new EmptyParamError('request.query'));
      }

      const posts = await this.listPost.listPost(request.query);
      return ok(posts);
    } catch (error) {
      return serverError(new ServerError('Internal Server Error'));
    }
  }
}

export type QueryParameter = {
  query: {
    limit: number,
    page: number
  }
}
