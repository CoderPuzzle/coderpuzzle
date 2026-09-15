import java.util.*;

class Solution {

    public int maximumBags(int[] capacity, int[] rocks, int additionalRocks) {
        int n = capacity.length;
        long[] needs = new long[n];
        for (int i = 0; i < n; i++) {
            needs[i] = (long) capacity[i] - rocks[i];
        }
        Arrays.sort(needs);
        long remaining = additionalRocks;
        int full = 0;
        for (int i = 0; i < n && needs[i] <= remaining; i++) {
            remaining -= needs[i];
            full++;
        }
        return full;
    }
}
