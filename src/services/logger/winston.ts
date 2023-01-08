import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

function twoDigitsNumber(number: number): string {
  if (number < 0) {
    return `-${twoDigitsNumber(-number)}`;
  }

  return number > 9 ? number.toString() : `0${number.toString()}`;
}

function dateLogFormat(date: Date) {
  const year = twoDigitsNumber(date.getFullYear());
  const month = twoDigitsNumber(date.getMonth());
  const day = twoDigitsNumber(date.getDay());
  const hour = twoDigitsNumber(date.getHours());
  const minute = twoDigitsNumber(date.getMinutes());
  const second = twoDigitsNumber(date.getSeconds());
  const miliseconds = twoDigitsNumber(date.getMilliseconds());

  return `${year}/${month}/${day}T${hour}:${minute}:${second}.${miliseconds}`;
}

const logger =
  process.env.NODE_ENV === 'development'
    ? winston.createLogger({
        handleExceptions: true,
        transports: new winston.transports.Console({
          format: winston.format.printf((info) => {
            const log = `${dateLogFormat(new Date())} [App] ${info.level} - ${
              info.message
            }`;
            return log;
          }),
        }),
        format: winston.format.combine(
          winston.format.simple(),
          winston.format.colorize()
        ),
      })
    : winston.createLogger({
        handleExceptions: true,
        transports: new DailyRotateFile({
          filename: `${process.env.LOG_DIR ?? './logs'}/app-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
        }),
        format: winston.format.json(),
      });

if (
  process.env.NODE_ENV !== 'development' &&
  process.env.LOG_STDOUT === 'yes'
) {
  logger.add(new winston.transports.Console());
}

export default logger;
