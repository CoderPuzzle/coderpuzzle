class Solution {

    private static final long MOD = 1_000_000_007L;

    public int minimumPossibleSum(int n, int target) {
        // Cheaply available prefix 1..k: its two largest distinct values sum
        // to k + (k - 1) <= target - 1 < target, so it never self-conflicts.
        // Every value in (k, target) pairs with an already-taken small number,
        // so the greedy jumps straight past target for the remaining m slots;
        // values >= target only pair with non-positive complements or larger
        // values, so the tail target..target+m-1 is also conflict-free.
        long k = Math.min(n, target / 2);
        long m = n - k;
        // Exact worst case ~7.6e17, far below the long ceiling.
        long total = (k * (k + 1)) / 2 + m * target + (m * (m - 1)) / 2;
        return (int) (total % MOD);
    }
}
