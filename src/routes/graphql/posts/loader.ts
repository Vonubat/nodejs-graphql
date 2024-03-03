import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export function postsDataLoader(db: PrismaClient) {
  return new DataLoader(async (ids: readonly string[]) => {
    const rows = await db.post.findMany();

    return ids.map((id) => rows.find((it) => it.id === id));
  });
}
