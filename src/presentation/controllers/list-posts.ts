/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {ListPostUsecase} from '@domain/usecase/list-posts';
import {EmptyParamError, MissingParamError} from '../errors/';
import {badRequest} from '../helpers/http-helpers';
import {Controller} from '../protocols/controller';
import {HttpResponse} from '../protocols/http';


export class ListPost implements Controller {
  constructor(
    private readonly listPost: ListPostUsecase,
  ) {}
  async handle(request: QueryParameter): Promise<HttpResponse> {
    if (!request) {
      return badRequest(new MissingParamError('request'));
    }

    if (Object.entries(request).length === 0) {
      return badRequest(new MissingParamError('request.query'));
    }

    if (Object.entries(request['query']).length === 0) {
      return badRequest(new EmptyParamError('request.query'));
    }
    // @ts-ignore
    this.listPost.listPost();
    return {
      statusCode: 200,
      body: 'asdf',
    };
  }
}

export type QueryParameter = {
  query: {
    limit: number,
    page: number
  }
}
