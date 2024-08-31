import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userTag, password } = await req.json();

        if (!userTag || !password) {
            return NextResponse.json({ error: 'User tag and password are required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { userTag },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid user tag or password' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid user tag or password' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.id, userTag: user.userTag },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                userTag: user.userTag,
                profilePicture: user.profilePicture,
            },
        }, { status: 200 });

    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
