import java.math.BigInteger;
import java.util.Arrays;

class Solution {

    public int maxWeight(int[] weights, int w1, int w2) {
        // Row a is one wide integer whose bit j marks state (a, j) as
        // reachable: bag 1 filled to exactly a, bag 2 to exactly j.
        BigInteger lowMask = BigInteger.ZERO;
        for (int b = 0; b <= w2; b++) {
            lowMask = lowMask.setBit(b);
        }
        BigInteger[] rows = new BigInteger[w1 + 1];
        Arrays.fill(rows, BigInteger.ZERO);
        rows[0] = BigInteger.ONE;
        for (int w : weights) {
            // Bag-2 placements shift a whole row left, trimmed to the legal
            // occupancies. Stage them before the bag-1 pass below touches
            // rows, so both moves read the previous item's states only.
            BigInteger[] shifted = new BigInteger[w1 + 1];
            for (int a = 0; a <= w1; a++) {
                shifted[a] = rows[a].shiftLeft(w).and(lowMask);
            }
            // Bag-1 placements OR row a - w into row a, walked downward so
            // the merge reads pre-item rows and no item is spent twice.
            for (int a = w1; a >= w; a--) {
                rows[a] = rows[a].or(rows[a - w]);
            }
            for (int a = 0; a <= w1; a++) {
                rows[a] = rows[a].or(shifted[a]);
            }
        }
        int best = 0;
        for (int a = 0; a <= w1; a++) {
            if (rows[a].signum() > 0) {
                // Fixed a: the best partner is the highest reachable bit.
                best = Math.max(best, a + rows[a].bitLength() - 1);
            }
        }
        return best;
    }
}
