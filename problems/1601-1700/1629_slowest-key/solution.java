class Solution {

    public String slowestKey(int[] releaseTimes, String keysPressed) {
        // A single left-to-right scan computes each duration once and keeps
        // the best (longest duration, then lexicographically largest key).
        int bestDuration = releaseTimes[0];
        char bestChar = keysPressed.charAt(0);
        for (int i = 1; i < releaseTimes.length; ++i) {
            int duration = releaseTimes[i] - releaseTimes[i - 1];
            char c = keysPressed.charAt(i);
            if (duration > bestDuration || (duration == bestDuration && c > bestChar)) {
                bestDuration = duration;
                bestChar = c;
            }
        }
        return String.valueOf(bestChar);
    }
}
