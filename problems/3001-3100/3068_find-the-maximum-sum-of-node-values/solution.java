class Solution {

    public long maximumValueSum(int[] nums, int k, int[][] edges) {
        long base = 0;
        int posCount = 0;
        long minPos = Long.MAX_VALUE;
        long maxNonPos = Long.MIN_VALUE;
        boolean hasPos = false;
        boolean hasNonPos = false;
        // Each operation XORs two endpoints, and tree connectivity lets any
        // even-sized subset of nodes be flipped, so only the parity of the
        // pick matters. d = gain from flipping one node; greedily take every
        // positive delta while tracking the smallest positive and the largest
        // non-positive for a possible parity fix.
        for (int x : nums) {
            long d = (long) (x ^ k) - x;
            base += x;
            if (d > 0) {
                posCount++;
                base += d;
                if (d < minPos) {
                    minPos = d;
                }
                hasPos = true;
            } else {
                if (d > maxNonPos) {
                    maxNonPos = d;
                }
                hasNonPos = true;
            }
        }
        if (posCount % 2 == 0) {
            return base;
        }
        // Odd flip count is illegal: either drop the smallest positive delta
        // or add the largest non-positive one, whichever costs less.
        long best = Long.MAX_VALUE;
        if (hasPos) {
            best = minPos;
        }
        if (hasNonPos) {
            long penalty = -maxNonPos;
            if (penalty < best) {
                best = penalty;
            }
        }
        return base - best;
    }
}
