'use client';

import { Space } from '@/zenstack/models';
import { schema } from '@/zenstack/schema-lite';
import { useClientQueries } from '@zenstackhq/tanstack-query/react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { createContext } from 'react';

export const UserContext = createContext<User | undefined>(undefined);

export function useCurrentUser() {
    const { data: session } = useSession();
    return session?.user;
}

export const SpaceContext = createContext<Space | undefined>(undefined);

export function useCurrentSpace() {
    const params = useParams<{ slug: string }>();
    const client = useClientQueries(schema);
    const { data: spaces } = client.space.useFindMany(
        {
            where: { slug: params.slug },
        },
        {
            enabled: !!params.slug,
        }
    );

    return spaces?.[0];
}
