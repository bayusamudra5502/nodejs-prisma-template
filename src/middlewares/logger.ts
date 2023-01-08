import output from '@/utils/output';
import logger from '@services/logger/winston';
import type express from 'express';

const methodColor: { [key: string]: string } = {
  GET: output.foreGreen,
  POST: output.foreBlue,
  PUT: output.foreCyan,
  PATCH: output.foreMagenta,
  DELETE: output.foreRed,
};

const parseResponseQuality = (code: number) => {
  if (code === -1) {
    return '';
  }

  if (code >= 200 && code < 300) {
    return `${output.foreGreen}${code}${output.reset}`;
  }

  if (code >= 300 && code < 400) {
    return `${output.foreBlue}${code}${output.reset}`;
  }

  if (code >= 400 && code < 500) {
    return `${output.foreYellow}${code}${output.reset}`;
  }

  if (code >= 500 && code < 600) {
    return `${output.foreRed}${code}${output.reset}`;
  }

  return `${output.reset}${code}${output.reset}`;
};

export const requestLogger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const startTime = new Date().getTime();
  next();

  const responseTime = new Date().getTime() - startTime;
  const { method, url } = req;

  if (process.env.NODE_ENV === 'development') {
    logger.info(
      `${methodColor[method] ?? output.foreWhite}${method}${
        output.reset
      } ${url} - ${parseResponseQuality(
        res.statusCode ?? -1
      )} ${responseTime}ms`
    );
  } else {
    logger.info(`${method};${url};${res.statusCode};${responseTime}ms`);
  }
};
