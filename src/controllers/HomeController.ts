import type express from 'express';

export const indexRoute = (req: express.Request, res: express.Response) => {
  res.status(200).json({
    status: 'success',
    message: 'server is running',
  });
};
