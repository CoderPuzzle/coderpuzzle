class Solution {

    public int countStableSubsequences(int[] nums) {
        final long MOD = 1_000_000_007;
        // Three same-parity elements in a row are the only way a subsequence
        // breaks, so four counters describe every stable subsequence seen so
        // far: trailing even run of length 1 or 2, trailing odd run of 1 or
        // 2. Each update sums at most four residues, so long never overflows.
        long e1 = 0,
            e2 = 0,
            o1 = 0,
            o2 = 0;
        for (int x : nums) {
            if (x % 2 == 0) {
                // Fresh subsequence, odd-ending extensions (the even run
                // restarts at 1), or an even run of 1 promoted to 2; both
                // updates read the old counters before either lands.
                long ne1 = (e1 + o1 + o2 + 1) % MOD;
                long ne2 = (e2 + e1) % MOD;
                e1 = ne1;
                e2 = ne2;
            } else {
                // Mirror image with odd and even swapped.
                long no1 = (o1 + e1 + e2 + 1) % MOD;
                long no2 = (o2 + o1) % MOD;
                o1 = no1;
                o2 = no2;
            }
        }
        return (int) ((e1 + e2 + o1 + o2) % MOD);
    }
}
