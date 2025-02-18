import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { token, content } = await request.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const post = await prisma.post.create({
      data: {
        content,
        userId: decoded.userId,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
