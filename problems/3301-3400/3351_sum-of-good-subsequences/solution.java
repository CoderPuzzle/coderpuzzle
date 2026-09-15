class Solution {

    public int sumOfGoodSubsequences(int[] nums) {
        final int MOD = 1_000_000_007;
        // offset by 1 so that value 0 can look up value -1 at index 0
        // cnt[i] / sm[i]: number of, and total element sum of, the good
        // subsequences seen so far that end in value i - 1. The differ-by-one
        // constraint only involves the last value, so this is enough state.
        long[] cnt = new long[100003];
        long[] sm = new long[100003];
        long total = 0;
        for (int x : nums) {
            int idx = x + 1;
            // New subsequences ending at x: the singleton plus every recorded
            // subsequence ending in x-1 or x+1 extended by x.
            long cPrev = cnt[idx - 1];
            long cNext = cnt[idx + 1];
            long sPrev = sm[idx - 1];
            long sNext = sm[idx + 1];
            long newCnt = (1 + cPrev + cNext) % MOD;
            // Each of the newCnt subsequences gains one copy of x; the
            // elements already inside carry their sums forward.
            long newSum = ((long) x * newCnt + sPrev + sNext) % MOD;
            cnt[idx] = (cnt[idx] + newCnt) % MOD;
            sm[idx] = (sm[idx] + newSum) % MOD;
            // A subsequence's sum is folded in when its last element is
            // appended, so every good subsequence is counted exactly once.
            total = (total + newSum) % MOD;
        }
        return (int) total;
    }
}
