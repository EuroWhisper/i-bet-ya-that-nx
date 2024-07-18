'use server';

import { signIn, signOut } from '../utils/auth';

export const signInGoogle = async () => {
  await signIn('google');
};

export const signOutAll = async () => {
  await signOut({ redirectTo: '/' });
};
