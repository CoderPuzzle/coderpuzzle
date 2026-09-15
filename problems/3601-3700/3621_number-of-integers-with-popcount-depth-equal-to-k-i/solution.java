class Solution {

    public long popcountDepth(long n, int k) {
        // depth[j] = popcount-depth of the value j itself: 1 has depth 0,
        // deeper values sit one step past their own popcount.
        int[] depth = new int[64];
        for (int j = 2; j < 64; ++j) depth[j] = depth[Long.bitCount(j)] + 1;
        // Digit DP over the binary digits of n: free[x] counts prefixes
        // already strictly below n's prefix that carry x set bits, while
        // tightOnes follows n's exact prefix. Answers reach ~5e14, past
        // the int range.
        long[] free = new long[64];
        int tightOnes = 0;
        for (int i = 63 - Long.numberOfLeadingZeros(n); i >= 0; --i) {
            long[] nxt = free.clone();
            for (int x = 0; x < 64; ++x) {
                if (free[x] != 0) nxt[x + 1] += free[x];
            }
            if (((n >> i) & 1) == 1) {
                // Place 0 under n's 1: that branch goes loose, free to
                // take any suffix of the remaining bits.
                nxt[tightOnes] += 1;
                ++tightOnes;
            }
            free = nxt;
        }
        // counts[x] = integers in [1, n] with x set bits (0 included).
        long[] counts = free.clone();
        counts[tightOnes] += 1;
        counts[0] -= 1; // the all-zero string is not a positive integer
        counts[1] -= 1; // x = 1 itself has depth 0, not depth 1
        long answer = k == 0 ? 1 : 0;
        for (int j = 1; j < 64; ++j) {
            if (depth[j] == k - 1) answer += counts[j];
        }
        return answer;
    }
}
