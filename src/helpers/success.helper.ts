import { SuccessCode } from 'src/constraints/success-dictionary.contraint';

const OK = <T = null>(message: string, data?: T) => {
  return {
    statusCode: SuccessCode.OK,
    message,
    data,
  };
};

const CREATED = <T = null>(message: string, data?: T) => {
  return {
    statusCode: SuccessCode.CREATED,
    message,
    data,
  };
};

export { CREATED, OK };
