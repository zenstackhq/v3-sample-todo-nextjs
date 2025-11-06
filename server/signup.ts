'use server';
import { hashSync } from 'bcryptjs';
import { db } from './db';
import { ZenStackError } from '@zenstackhq/orm';

export async function signup(data: { email: string; password: string }) {
    try {
        const user = await db.user.create({
            data: {
                email: data.email,
                password: hashSync(data.password),
            },
        });
        return { data: user };
    } catch (err) {
        if (err instanceof ZenStackError && (err.cause as any)?.code === '23505') {
            // postgres unique constraint violation
            return { error: { message: 'User already exists' } };
        } else {
            return { error: { message: 'An unexpected error occurred' } };
        }
    }
}
