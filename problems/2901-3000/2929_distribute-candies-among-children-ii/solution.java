class Solution {

    private static long cappedWays(long candies) {
        return candies >= 2 ? (candies * (candies - 1)) / 2 : 0;
    }

    public long distributeCandies(int n, int limit) {
        // Inclusion-exclusion over the three per-child caps: without caps
        // the splits of n among 3 children number C(n + 2, 2); forcing a
        // child over its cap is counted by C(n - (limit+1) + 2, 2), and
        // the alternating sum repairs double- and triple-forced overlaps.
        // Terms reach 1.5 * 10^12, so long carries every intermediate.
        return (
            cappedWays(n + 2L) -
            3 * cappedWays(n - (limit + 1L) + 2) +
            3 * cappedWays(n - 2 * (limit + 1L) + 2) -
            cappedWays(n - 3 * (limit + 1L) + 2)
        );
    }
}
