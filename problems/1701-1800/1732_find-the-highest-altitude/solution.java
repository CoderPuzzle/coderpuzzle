class Solution {

    public int largestAltitude(int[] gain) {
        // The altitude at point i is the prefix sum gain[0] + ... +
        // gain[i-1], with point 0 itself sitting at altitude 0. Walk the
        // trip once carrying the running altitude, and seed the best
        // with that starting 0 so a trip that never climbs above its
        // start still reports 0.
        int altitude = 0,
            best = 0;
        for (int g : gain) {
            altitude += g;
            best = Math.max(best, altitude);
        }
        return best;
    }
}
