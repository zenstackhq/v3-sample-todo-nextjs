import { schema } from '@/zenstack/schema';
import { ZenStackClient } from '@zenstackhq/orm';
import { PolicyPlugin } from '@zenstackhq/plugin-policy';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export const db = new ZenStackClient(schema, {
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.DATABASE_URL,
        }),
    }),
    log: ['query', 'error'],
});

export const authDb = db.$use(new PolicyPlugin());
