class Solution {

    // One monotonic-index sweep per side: popping every strictly taller
    // index before i leaves j, the nearest index with
    // maxHeights[j] <= maxHeights[i]; towers j+1..i clip to the peak
    // height while the prefix up to j keeps its own best mountain, so
    // left[i] = left[j] + maxHeights[i] * (i - j). Sums reach
    // n * max(maxHeights[i]) = 10^5 * 10^9 = 10^14, past int range, so
    // they accumulate in a long; no intermediate exceeds that, far below
    // the ~9.2 * 10^18 long ceiling.
    public long maximumSumOfHeights(int[] maxHeights) {
        int n = maxHeights.length;
        long[] left = new long[n];
        long[] right = new long[n];
        int[] stack = new int[n];
        int size = 0;
        for (int i = 0; i < n; i++) {
            long h = maxHeights[i];
            while (size > 0 && maxHeights[stack[size - 1]] > h) {
                size--;
            }
            if (size == 0) {
                left[i] = h * (i + 1);
            } else {
                int j = stack[size - 1];
                left[i] = left[j] + h * (i - j);
            }
            stack[size++] = i;
        }
        size = 0;
        for (int i = n - 1; i >= 0; i--) {
            long h = maxHeights[i];
            while (size > 0 && maxHeights[stack[size - 1]] > h) {
                size--;
            }
            if (size == 0) {
                right[i] = h * (n - i);
            } else {
                int j = stack[size - 1];
                right[i] = right[j] + h * (j - i);
            }
            stack[size++] = i;
        }
        long best = 0;
        for (int i = 0; i < n; i++) {
            best = Math.max(best, left[i] + right[i] - maxHeights[i]);
        }
        return best;
    }
}
