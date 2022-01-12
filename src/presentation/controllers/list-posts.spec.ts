/* eslint-disable max-len */
import {MissingParamError} from '../errors/';
import {badRequest} from '../helpers/http-helpers';
import {Controller} from '../protocols/controller';
import {ListPost} from './list-posts';
const makeSut = (): Controller => new ListPost();
describe('list post controller ', () => {
  it('list-post controller should receive request object', async () => {
    const sut = makeSut();
    // @ts-ignore
    const result = await sut.handle();
    expect(result).toEqual(badRequest(new MissingParamError('request')));
  });
});
