/* eslint-disable require-jsdoc */
export class EmptyParamError extends Error {
  constructor(paramName: string) {
    super(`Empty Param: ${paramName}`);
    this.name = 'EmptyParamError';
  }
}

