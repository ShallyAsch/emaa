import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getPreferences, upsertUser } from '@/src/lib/db';

export default async function WelcomePage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const clerkUser = await currentUser();
  if (clerkUser) {
    const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress || '';
    await upsertUser({
      clerk_id: clerkUser.id,
      username: clerkUser.username || '',
      email: primaryEmail,
      first_name: clerkUser.firstName || '',
      last_name: clerkUser.lastName || '',
      image_url: clerkUser.imageUrl || '',
    });
  }

  const prefs = await getPreferences(userId);

  if (prefs && prefs.favorite_foods && prefs.favorite_foods.length > 0) {
    redirect('/');
  }

  redirect('/onboarding');
}
