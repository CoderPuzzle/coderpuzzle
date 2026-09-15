class Solution {

    public int[] gcdValues(int[] nums, long[] queries) {
        int maxValue = 0;
        for (int value : nums) {
            maxValue = Math.max(maxValue, value);
        }
        int[] freq = new int[maxValue + 1];
        for (int value : nums) {
            freq[value]++;
        }
        // pairs_with_gcd[d]: pairs whose gcd is exactly d. Processing d from
        // maxValue down, pairs sharing divisor d minus the already-fixed
        // exact counts of every proper multiple of d (inclusion-exclusion).
        // Pair counts reach n * (n - 1) / 2 ~= 5 * 10^9, past int range.
        long[] exact = new long[maxValue + 1];
        for (int d = maxValue; d >= 1; d--) {
            long count = 0;
            for (int multiple = d; multiple <= maxValue; multiple += d) {
                count += freq[multiple];
            }
            long pairs = (count * (count - 1)) / 2;
            for (int multiple = 2 * d; multiple <= maxValue; multiple += d) {
                pairs -= exact[multiple];
            }
            exact[d] = pairs;
        }
        long[] prefix = new long[maxValue + 1];
        long running = 0;
        for (int d = 1; d <= maxValue; d++) {
            running += exact[d];
            prefix[d] = running;
        }
        // Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9 and arrive as
        // longs; each answer is a gcd, at most 5 * 10^4.
        int[] answer = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int lo = 1;
            int hi = maxValue;
            long target = queries[i] + 1;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (prefix[mid] >= target) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            answer[i] = lo;
        }
        return answer;
    }
}
