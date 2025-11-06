'use server';
import { hashSync } from 'bcryptjs';
import { db } from './db';

export async function signup(data: { email: string; password: string }) {
    return db.user.create({
        data: {
            email: data.email,
            password: hashSync(data.password),
        },
    });
}
