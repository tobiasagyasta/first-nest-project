import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const logger = new Logger('HTTP');

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = Date.now();
  const { method, originalUrl } = req;
  const userAgent = req.get('user-agent') ?? 'unknown';
  const requestId = req.requestId ?? null;
  const requestIdPrefix = requestId ? `[${requestId}] ` : '';

  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    logger.log(
      `${requestIdPrefix} ${method} ${originalUrl} ${res.statusCode} - ${userAgent} ${responseTime}ms`,
    );
  });

  next();
}
