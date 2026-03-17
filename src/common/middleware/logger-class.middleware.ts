import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerClassMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') ?? 'unknown';
    const requestId = (req as any).requestId ?? null;
    const requestIdPrefix = requestId ? `[${requestId}] ` : '';

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `${requestIdPrefix}${method} ${originalUrl} ${res.statusCode} - ${userAgent} ${responseTime}ms`,
      );
    });

    next();
  }
}
