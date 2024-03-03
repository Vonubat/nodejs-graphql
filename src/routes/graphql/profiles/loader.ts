import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export function profilesDataLoader(db: PrismaClient) {
  return new DataLoader(async (ids: readonly string[]) => {
    const rows = await db.profile.findMany();

    return ids.map((id) => rows.find((it) => it.id === id));
  });
}
