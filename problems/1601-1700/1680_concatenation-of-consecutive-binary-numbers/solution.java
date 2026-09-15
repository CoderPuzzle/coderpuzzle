class Solution {

    public int concatenatedBinary(int n) {
        // Appending the L-bit binary form of i to a value v computes
        // v * 2^L + i, so a running residue carries the whole concatenation
        // without ever materializing it — at n = 10^5 the string already
        // spans 1,568,946 bits. L is i's bit length: it starts at 1 and
        // increments exactly when i is a power of two, (i & (i - 1)) == 0,
        // because only a newly set highest bit widens the run. The residue
        // stays below 2^30 and L at or below 17, so result * 2^L + i stays
        // below 2^48 — safely inside the 64-bit long used here.
        final int MOD = 1_000_000_007;
        long result = 0;
        int length = 0;
        for (int i = 1; i <= n; ++i) {
            if ((i & (i - 1)) == 0) {
                length += 1;
            }
            result = (result * (1L << length) + i) % MOD;
        }
        return (int) result;
    }
}
