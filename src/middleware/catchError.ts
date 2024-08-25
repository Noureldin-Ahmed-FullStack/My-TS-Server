import { Request, Response, NextFunction } from 'express';

// TypeScript version of the catchError function
export function catchError(func: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(err => {
            next(err);
        });
    };
}
