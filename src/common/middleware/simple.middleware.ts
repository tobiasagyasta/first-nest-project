import { NextFunction, Request, Response } from 'express';

export function simpleMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `Hallo saya simple middleware! ${req.originalUrl} ${res.statusCode}`,
  );
  next();
}
