import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userTag, password } = await req.json();

        if (!userTag || !password) {
            return NextResponse.json({ error: 'User tag and password are required' }, { status: 400 });
        }

        // Check if the userTag exists
        const user = await prisma.user.findFirst({
            where: { userTag: userTag },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid user tag or password' }, { status: 401 });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid user tag or password' }, { status: 401 });
        }

        // If the user is authenticated, you can return the user data
        return NextResponse.json({ message: 'Logged in successfully', user }, { status: 200 });
    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}