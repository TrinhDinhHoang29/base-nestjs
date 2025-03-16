import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ERRORS_DICTIONARY } from 'src/constraints/error-dictionary.constraint';

const BAD_REQUEST = <T = null>(message: string, errors?: T) => {
  throw new BadRequestException(message, {
    description: `${HttpStatus.NOT_FOUND}`,
    cause: {
      ...errors,
    },
  });
};

const NOT_FOUND_USER = <T = null>(message: string, errors?: T) => {
  throw new BadRequestException(message, {
    description: ERRORS_DICTIONARY.NOT_FOUND,
    cause: {
      ...errors,
    },
  });
};

const PASSWORD_WRONG = <T = null>(message: string, errors?: T) => {
  throw new BadRequestException(message, {
    description: ERRORS_DICTIONARY.PASSWORD_WRONG,
    cause: {
      ...errors,
    },
  });
};

const NOT_JWT = <T = null>(message: string, errors?: T) => {
  throw new BadRequestException(message, {
    description: ERRORS_DICTIONARY.NO_JWT,
    cause: {
      ...errors,
    },
  });
};

const VAL_ERROR = <T = null>(message: string, errors?: T) => {
  throw new BadRequestException(message, {
    description: ERRORS_DICTIONARY.VALIDATION_ERROR,
    cause: {
      ...errors,
    },
  });
};
export { BAD_REQUEST, VAL_ERROR, NOT_FOUND_USER, PASSWORD_WRONG, NOT_JWT };
