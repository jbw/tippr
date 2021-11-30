
import { NextFunction, Request, Response } from "express";

import { Logger } from "@nestjs/common";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  Logger.log(`Handling ${req.method} ${req.url}`, 'info');
  next();
  Logger.log(`Handled ${req.url} status code: ${res.statusCode}`, 'info');

};
