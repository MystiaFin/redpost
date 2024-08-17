import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, userTag, password } = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          name: username,
          userTag,
          password,
        },
      });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          res.status(400).json({ message: 'UserTag already exists' });
        } else {
          res.status(500).json({ message: 'Database error', error: error.message });
        }
      } else {
        res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}