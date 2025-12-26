import { UserProfile, ApiResponse } from '@/types/user';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data generators
const firstNames = [
  'James',
  'Mary',
  'John',
  'Patricia',
  'Robert',
  'Jennifer',
  'Michael',
  'Linda',
  'William',
  'Elizabeth',
  'David',
  'Barbara',
  'Richard',
  'Susan',
  'Joseph',
  'Jessica',
  'Thomas',
  'Sarah',
  'Christopher',
  'Karen',
];

const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
  'Lee',
];

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];

const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'WA', 'GA', 'NC'];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateAccountNumber = (): string => {
  return `ACC${Math.random().toString(36).substring(2, 10).toUpperCase()}${Date.now().toString().slice(-6)}`;
};

/**
 * Generates a random user profile
 */
export const generateUserProfile = (): UserProfile => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const accountBalance = parseFloat((Math.random() * 100000).toFixed(2));
  const kycStatuses: Array<'pending' | 'verified' | 'rejected'> = [
    'pending',
    'verified',
    'rejected',
  ];
  const kycStatus = getRandomElement(kycStatuses);

  return {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    accountBalance,
    currency: 'USD',
    accountNumber: generateAccountNumber(),
  };
};

/**
 * Simulates fetching a user profile from an API
 * @param userId - Optional user ID. If not provided, generates a new random profile
 * @param delayMs - Optional delay in milliseconds to simulate network latency (default: 800ms)
 */
export const getUserProfile = async (
  userId?: string,
  delayMs: number = 800
): Promise<ApiResponse<UserProfile>> => {
  // Simulate network delay
  await delay(delayMs);

  // Simulate occasional errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch user profile. Please try again.');
  }

  const userProfile = generateUserProfile();

  return {
    data: userProfile,
    success: true,
    message: 'User profile fetched successfully',
    timestamp: new Date().toISOString(),
  };
};

/**
 * Simulates updating a user profile
 * @param userId - User ID
 * @param updates - Partial user profile data to update
 * @param delayMs - Optional delay in milliseconds (default: 600ms)
 */
export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>,
  delayMs: number = 600
): Promise<ApiResponse<UserProfile>> => {
  await delay(delayMs);

  // Simulate occasional errors (3% chance)
  if (Math.random() < 0.03) {
    throw new Error('Failed to update user profile. Please try again.');
  }

  const currentProfile = generateUserProfile();
  const updatedProfile: UserProfile = {
    ...currentProfile,
    ...updates,
    id: userId,
  };

  return {
    data: updatedProfile,
    success: true,
    message: 'User profile updated successfully',
    timestamp: new Date().toISOString(),
  };
};

/**
 * Simulates fetching multiple user profiles
 * @param count - Number of profiles to generate (default: 10)
 * @param delayMs - Optional delay in milliseconds (default: 1000ms)
 */
export const getUserProfiles = async (
  count: number = 10,
  delayMs: number = 1000
): Promise<ApiResponse<UserProfile[]>> => {
  await delay(delayMs);

  const profiles = Array.from({ length: count }, () => generateUserProfile());

  return {
    data: profiles,
    success: true,
    message: `${count} user profiles fetched successfully`,
    timestamp: new Date().toISOString(),
  };
};
