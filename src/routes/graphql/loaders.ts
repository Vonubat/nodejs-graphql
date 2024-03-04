import { PrismaClient } from '@prisma/client';
import { initPostsLoader } from './posts/loaders.js';
import { initProfilesLoader } from './profiles/loaders.js';
import { initMemberTypesLoader } from './member-types/loaders.js';
import {
  initUsersLoader,
  initSubscriptionsToUsersLoader,
  initUsersSubscriptionsLoader,
} from './users/loaders.js';

export function initDataLoaders(db: PrismaClient) {
  return {
    postsLoader: initPostsLoader(db),
    usersLoader: initUsersLoader(db),
    memberTypesLoader: initMemberTypesLoader(db),
    profilesLoader: initProfilesLoader(db),
    subscriptionsToUsersLoader: initSubscriptionsToUsersLoader(db),
    usersSubscriptionsLoader: initUsersSubscriptionsLoader(db),
  };
}

export type DataLoaders = ReturnType<typeof initDataLoaders>;
