/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {MissingParamError} from '../errors/';
import {badRequest} from '../helpers/http-helpers';
import {Controller} from '../protocols/controller';
import {HttpResponse} from '../protocols/http';


export class ListPost implements Controller {
  async handle(request: QueryParameter): Promise<HttpResponse> {
    if (!request) {
      return badRequest(new MissingParamError('request'));
    }

    if (Object.entries(request).length === 0) {
      return badRequest(new MissingParamError('request.query'));
    }
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
