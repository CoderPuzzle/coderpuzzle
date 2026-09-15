class Solution {

    private static final int MOD = 1_000_000_007;

    public int numOfSubarrays(int[] arr) {
        // `even`/`odd` count prefixes seen so far (including the empty
        // prefix before the array) with even/odd parity; a new odd-parity
        // prefix pairs with every earlier even prefix to make an odd-sum
        // subarray, and symmetrically for a new even-parity prefix.
        // `total` is a long so the running sum never overflows before the
        // mod is applied.
        long even = 1;
        long odd = 0;
        int parity = 0;
        long total = 0;
        for (int x : arr) {
            parity ^= x & 1;
            if (parity == 1) {
                total = (total + even) % MOD;
                odd++;
            } else {
                total = (total + odd) % MOD;
                even++;
            }
        }
        return (int) total;
    }
}
