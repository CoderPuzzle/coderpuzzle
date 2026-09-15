import java.util.Arrays;

class Solution {

    public int maxArea(int h, int w, int[] horizontalCuts, int[] verticalCuts) {
        final int MOD = 1_000_000_007;
        long maxH = widest(h, horizontalCuts);
        long maxW = widest(w, verticalCuts);
        return (int) (((maxH % MOD) * (maxW % MOD)) % MOD);
    }

    private long widest(int length, int[] cuts) {
        Arrays.sort(cuts);
        long best = Math.max(cuts[0], length - cuts[cuts.length - 1]);
        for (int i = 1; i < cuts.length; i++) {
            best = Math.max(best, cuts[i] - cuts[i - 1]);
        }
        return best;
    }
}
