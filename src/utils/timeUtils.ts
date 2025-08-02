/**
 * Formats seconds into MM:SS format
 * @param seconds - Number of seconds to format
 * @returns Formatted time string in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Converts minutes to seconds
 * @param minutes - Number of minutes
 * @returns Number of seconds
 */
export const minutesToSeconds = (minutes: number): number => {
  return minutes * 60;
};

/**
 * Converts seconds to minutes
 * @param seconds - Number of seconds
 * @returns Number of minutes
 */
export const secondsToMinutes = (seconds: number): number => {
  return Math.floor(seconds / 60);
}; 