import { useState, useEffect, useCallback } from 'react';
import { getUserProfile, updateUserProfile } from '@/lib/api';
import { UserProfile } from '@/types/user';

interface UseUserProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

/**
 * Custom hook to fetch and manage user profile
 * @param userId - Optional user ID. If not provided, generates a new random profile
 * @param autoFetch - Whether to automatically fetch on mount (default: true)
 */
export const useUserProfile = (
  userId?: string,
  autoFetch: boolean = true
): UseUserProfileReturn => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserProfile(userId);
      setProfile(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!profile?.id) {
        setError('No profile loaded to update');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await updateUserProfile(profile.id, updates);
        setProfile(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update user profile');
      } finally {
        setLoading(false);
      }
    },
    [profile?.id]
  );

  useEffect(() => {
    if (autoFetch) {
      fetchProfile();
    }
  }, [autoFetch, fetchProfile]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
  };
};
