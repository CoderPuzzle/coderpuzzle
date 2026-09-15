class Solution {

    public int[] makeParityAlternating(int[] nums) {
        // Bounds stay within ±10^9 + 1, so they fit int, but the width can
        // reach 2 × 10^9 — computed in long for headroom and returned as int,
        // which it provably fits.
        // An alternating array follows one of two templates (even-first or
        // odd-first), and every element fits exactly one of them at its
        // index — so one pass scores both. The template an element matches
        // pins its value; the other pays one operation and may settle at
        // v - 1 or v + 1, whose window the slack bounds v+1 / v-1 enclose.
        int[] ops = { 0, 0 };
        long[] lo = { Long.MAX_VALUE, Long.MAX_VALUE };
        long[] hi = { Long.MIN_VALUE, Long.MIN_VALUE };
        for (int i = 0; i < nums.length; i++) {
            int v = nums[i];
            int matched = (v & 1) == (i & 1) ? 0 : 1;
            int missed = 1 - matched;
            ops[missed]++;
            lo[missed] = Math.min(lo[missed], (long) v + 1);
            hi[missed] = Math.max(hi[missed], (long) v - 1);
            lo[matched] = Math.min(lo[matched], v);
            hi[matched] = Math.max(hi[matched], v);
        }
        int bestOps = Integer.MAX_VALUE;
        long bestSpread = Long.MAX_VALUE;
        for (int t = 0; t < 2; t++) {
            long spread = hi[t] - lo[t];
            if (ops[t] > 0 && spread < 1) {
                // Paying operations means n >= 2 and the final array
                // alternates, so its spread is at least 1; the slack bounds
                // alone can collapse to 0 (nums = [10, 10]).
                spread = 1;
            }
            if (ops[t] < bestOps || (ops[t] == bestOps && spread < bestSpread)) {
                bestOps = ops[t];
                bestSpread = spread;
            }
        }
        return new int[] { bestOps, (int) bestSpread };
    }
}
