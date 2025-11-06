import { schema } from '@/zenstack/schema';
import { RPCApiHandler } from '@zenstackhq/server/api';
import { NextRequestHandler } from '@zenstackhq/server/next';
import { auth } from 'server/auth';
import { authDb, db } from 'server/db';

// create an enhanced Prisma client with user context
async function getClient() {
    const authObj = await auth();
    if (authObj?.user) {
        const user = await db.user.findUniqueOrThrow({
            where: { id: authObj.user.id },
            include: { memberships: true },
        });
        return authDb.$setAuth(user);
    } else {
        return authDb;
    }
}

const handler = NextRequestHandler({
    getClient,
    useAppDir: true,
    apiHandler: new RPCApiHandler({ schema }),
});

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };
