class Solution {

    public long maxProduct(int[] nums) {
        // One sweep keeps the two largest and the two smallest values. Those
        // four slots always contain the two elements of largest magnitude:
        // absolute values are V-shaped across a sorted array, so both
        // winners come off its ends.
        long max1 = Long.MIN_VALUE,
            max2 = Long.MIN_VALUE;
        long min1 = Long.MAX_VALUE,
            min2 = Long.MAX_VALUE;
        for (int value : nums) {
            if (value > max1) {
                max2 = max1;
                max1 = value;
            } else if (value > max2) {
                max2 = value;
            }
            if (value < min1) {
                min2 = min1;
                min1 = value;
            } else if (value < min2) {
                min2 = value;
            }
        }
        // The optimal triple is the mandatory replacement pushed to +-10^5
        // (its sign matched to the pair) times the most extreme pair product.
        long[] extremes = { max1, max2, min1, min2 };
        long bestPair = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = i + 1; j < 4; j++) {
                bestPair = Math.max(bestPair, Math.abs(extremes[i] * extremes[j]));
            }
        }
        return 100000L * bestPair;
    }
}
