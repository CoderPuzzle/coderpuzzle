class Solution {

    public int[] maxSumOfThreeSubarrays(int[] nums, int k) {
        // Fixed length k reduces the search to picking starts: window[s] is
        // the sum of nums[s..s+k), and an answer is a triple (i, j, l) with
        // i + k <= j and j + k <= l maximizing window[i] + window[j] +
        // window[l]. left[s] tracks the largest window over starts [0..s],
        // kept at the SMALLEST index on ties, and right[s] the same over
        // [s..m-1] — each middle j therefore pairs with the lexicographically
        // best flanks available to it.
        int n = nums.length;
        int m = n - k + 1;
        int[] window = new int[m];
        int total = 0;
        for (int s = 0; s < k; ++s) {
            total += nums[s];
        }
        window[0] = total;
        for (int s = 1; s < m; ++s) {
            total += nums[s + k - 1] - nums[s - 1];
            window[s] = total;
        }
        int[] left = new int[m];
        for (int s = 1; s < m; ++s) {
            left[s] = window[left[s - 1]] >= window[s] ? left[s - 1] : s;
        }
        int[] right = new int[m];
        right[m - 1] = m - 1;
        for (int s = m - 2; s >= 0; --s) {
            right[s] = window[s] >= window[right[s + 1]] ? s : right[s + 1];
        }
        // Strict improvement only, so the FIRST middle achieving the maximum
        // survives the sweep — which is the lexicographic rule: with j fixed
        // the flanks are independent, and mixing a smaller flank into a
        // smaller middle only ever produces a lexicographically smaller
        // optimum, so the global answer sits at the minimal middle. Every
        // window sum is at least k, so -1 sits below any real total.
        int bestTotal = -1;
        int[] best = new int[3];
        for (int j = k; j <= n - 2 * k; ++j) {
            int i = left[j - k];
            int l = right[j + k];
            total = window[i] + window[j] + window[l];
            if (total > bestTotal) {
                bestTotal = total;
                best[0] = i;
                best[1] = j;
                best[2] = l;
            }
        }
        return best;
    }
}
