import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, userTag, password } = await req.json();

        if (!name || !userTag || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Check if the name or userTag is already taken
        const existingUser = await prisma.user.findFirst({
            where:
                    { userTag: userTag }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'name or userTag already exists' }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                userTag,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
