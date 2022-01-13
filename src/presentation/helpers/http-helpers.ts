import {HttpResponse} from '@presentation/protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (erorr: Error): HttpResponse => ({
  statusCode: 500,
  body: erorr,
});
