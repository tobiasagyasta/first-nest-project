import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export function requestTrackingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = req.get('x-request-id')?.trim() || randomUUID();

  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);

  next();
}
