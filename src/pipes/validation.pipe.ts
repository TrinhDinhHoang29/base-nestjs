import { ValidationPipe } from '@nestjs/common';
import { VAL_ERROR } from 'src/helpers/error.helper';

export const ValidationTransformPipe = new ValidationPipe({
  whitelist: true,
  skipMissingProperties: true,
  skipNullProperties: true,
  exceptionFactory: (errors) => {
    const resultErrors = errors.map((error) => ({
      field: error.property,
      detail: error.constraints?.[Object.keys(error.constraints)[0]],
    }));

    return VAL_ERROR('Request Body không hợp lệ', {
      validationError: resultErrors,
    });
  },
});
