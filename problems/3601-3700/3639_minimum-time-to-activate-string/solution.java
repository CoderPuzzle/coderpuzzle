class Solution {

    public int minTime(String s, int[] order, int k) {
        int n = s.length();
        // Once every character is a '*', all n * (n + 1) / 2 substrings are
        // valid; if even that total falls short of k, no time ever works.
        // The total passes 32 bits near n = 10^5, hence the widening.
        long total = ((long) n * (n + 1)) / 2;
        if (total < k) {
            return -1;
        }
        // Each replacement only turns more substrings valid, so activity is
        // monotone in t and the earliest active time admits a binary search.
        // Feasibility at t = n - 1 is guaranteed by the early return above.
        int lo = 0,
            hi = n - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (validCount(order, mid, total) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    // Number of substrings holding at least one star after the first
    // t + 1 positions are starred: the total minus what the star-free
    // runs hide, each maximal run of length L hiding 1 + 2 + ... + L.
    private long validCount(int[] order, int t, long total) {
        boolean[] starred = new boolean[order.length];
        for (int i = 0; i <= t; i++) {
            starred[order[i]] = true;
        }
        long invalid = 0,
            run = 0;
        for (boolean flag : starred) {
            if (flag) {
                run = 0;
            } else {
                run++;
                invalid += run;
            }
        }
        return total - invalid;
    }
}
