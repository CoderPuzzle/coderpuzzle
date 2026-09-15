class Solution {

    // Boxes are delivered in order, so every voyage carries a contiguous
    // stretch boxes l+1..i and costs 2 + runs[i] - runs[l+1]: one trip per
    // port change inside the stretch, plus the first port and the return
    // to storage (runs counts port changes before each index). Pulling the
    // i-dependent part out of dp[i]'s window minimum leaves key[l] =
    // dp[l] - runs[l+1], so a monotonic queue of l values keyed by key
    // answers each DP step in constant time while the weight and box
    // limits slide the window forward.
    public int boxDelivering(int[][] boxes, int portsCount, int maxBoxes, int maxWeight) {
        int n = boxes.length;
        // running loaded weight reaches 10^5 * 10^5 = 10^10 — 64 bits
        long[] weightPrefix = new long[n + 1];
        int[] runs = new int[n + 1];
        for (int i = 0; i < n; ++i) {
            weightPrefix[i + 1] = weightPrefix[i] + boxes[i][1];
            runs[i + 1] = runs[i] + (i > 0 && boxes[i - 1][0] != boxes[i][0] ? 1 : 0);
        }
        int[] dp = new int[n + 1];
        int[] key = new int[n];
        int[] window = new int[n]; // candidate l values with strictly increasing keys
        int head = 0;
        int tail = 0;
        int lightest = 0; // smallest l whose loaded weight still fits maxWeight
        for (int i = 1; i <= n; ++i) {
            int fresh = i - 1;
            key[fresh] = dp[fresh] - runs[i];
            while (tail > head && key[window[tail - 1]] >= key[fresh]) {
                --tail;
            }
            window[tail++] = fresh;
            // weights are positive, so this floor only moves forward
            while (weightPrefix[i] - weightPrefix[lightest] > maxWeight) {
                ++lightest;
            }
            int low = Math.max(lightest, i - maxBoxes);
            while (window[head] < low) {
                ++head;
            }
            dp[i] = 2 + runs[i] + key[window[head]];
        }
        return dp[n];
    }
}
