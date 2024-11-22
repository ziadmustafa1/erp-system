import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // العملية الأساسية للكود
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
