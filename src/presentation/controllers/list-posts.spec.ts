/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {EmptyParamError, MissingParamError, ServerError} from '../errors/';
import {badRequest, ok, serverError} from '../helpers/http-helpers';
import {Controller} from '../protocols/controller';
import {ListPostUsecase, PaginationParams} from '@domain/usecase/list-posts';
import {Post} from '@domain/models/post';
import {ListPost, QueryParameter} from './list-posts';


class MockListPost implements ListPostUsecase {
  async listPost(paginate: PaginationParams): Promise<Post[]> {
    return [
      {
        content: 'dfasdaf',
        images: ['asdfaf'],
        name: 'hi',
        tags: ['saf'],
      },
    ];
  }
}

const throwErr = () => {
  throw Error('some error');
};
type sutTypes = {
  sut: Controller<any>
  listPosts: ListPostUsecase
}
const makeSut = (): sutTypes => {
  const listPosts: ListPostUsecase = new MockListPost();
  // @ts-ignore
  const sut = new ListPost(listPosts);

  return {sut, listPosts};
};

describe('list post controller ', () => {
  it('list-post controller should receive request object', async () => {
    const {sut} = makeSut();
    // @ts-ignore
    const result = await sut.handle();
    expect(result).toEqual(badRequest(new MissingParamError('request')));
  });

  it('list-post controller should return MissingParamError if request doesnt has a query object', async () => {
    const {sut} = makeSut();

    const request = {};

    const result = await sut.handle(request);
    expect(result).toEqual(badRequest(new MissingParamError('request.query')));
  });

  // eslint-disable-next-line max-len
  it('list-post controller should return EmptyParamError if request.query is empty', async () => {
    const {sut} = makeSut();
    const request = {
      query: {},
    };
    const result = await sut.handle(request);
    expect(result).toEqual(badRequest(new EmptyParamError('request.query')));
  });

  it('list-post controller should call ListPosts.listPosts', async () => {
    const {sut, listPosts} = makeSut();

    // eslint-disable-next-line camelcase
    const listPosts_spy = jest.spyOn(listPosts, 'listPost');
    const request: QueryParameter = {
      query: {
        limit: 5,
        page: 1,
      },
    };
    await sut.handle(request);

    expect(listPosts_spy).toHaveBeenCalledTimes(1);
  });

  it('list-post controller should call ListPosts.listPosts with proper arguments', async () => {
    const {sut, listPosts} = makeSut();

    // eslint-disable-next-line camelcase
    const listPosts_spy = jest.spyOn(listPosts, 'listPost');
    const request: QueryParameter = {
      query: {
        limit: 5,
        page: 1,
      },
    };
    await sut.handle(request);

    expect(listPosts_spy).toHaveBeenCalledWith(request.query);
  });

  it('list-post controller return ServerError if Listposts.listPost throws', async () => {
    const {sut, listPosts} = makeSut();

    // eslint-disable-next-line camelcase
    jest.spyOn(listPosts, 'listPost').mockImplementationOnce(throwErr);
    const request: QueryParameter = {
      query: {
        limit: 5,
        page: 1,
      },
    };
    const result = await sut.handle(request);

    expect(result).toEqual(serverError(new ServerError('Internal Server Error')));
  });

  it('list-post controller return Ok if Listposts.listPost returns a list of posts', async () => {
    const {sut, listPosts} = makeSut();

    // eslint-disable-next-line camelcase
    const list_of_posts: Post[] = [
      {
        name: 'amigaOs, how to master',
        content: 'some fucking html',
        images: ['smile.jpeg'],
        tags: ['satanic'],
      },
    ];
    // eslint-disable-next-line camelcase
    jest.spyOn(listPosts, 'listPost').mockReturnValueOnce(Promise.resolve(list_of_posts));
    const request: QueryParameter = {
      query: {
        limit: 5,
        page: 1,
      },
    };
    const result = await sut.handle(request);
    expect(result).toEqual(ok(list_of_posts));
  });
});
