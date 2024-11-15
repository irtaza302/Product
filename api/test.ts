import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (_req: VercelRequest, res: VercelResponse) => {
  return res.status(200).json({
    status: 'success',
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
};

export default handler;