import java.util.Arrays;

class Solution {

    public int maxFrequencyScore(int[] nums, long k) {
        // After sorting, the elements worth converting to one value form a
        // contiguous window: the move cost of a set is minimized at its
        // median, and swapping any non-window member for a skipped
        // in-between element never costs more. Sliding a window [l, r]
        // rightward, the cheapest way to flatten it is to raise everything
        // to the median nums[(l + r) / 2], costing (median * left_count -
        // left_sum) + (right_sum - median * right_count) via prefix sums.
        // The cost only shrinks when the window shrinks, so l never moves
        // backwards. Costs reach n * span / 2 ~ 5 * 10^13 and k reaches
        // 10^14, so every product here is computed in 64-bit.
        Arrays.sort(nums);
        int n = nums.length;
        long[] pre = new long[n + 1];
        for (int i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + nums[i];
        }
        int best = 0;
        int l = 0;
        for (int r = 0; r < n; r++) {
            while (true) {
                int mid = (l + r) / 2;
                long median = nums[mid];
                long cost = median * (mid - l) - (pre[mid] - pre[l]) + (pre[r + 1] - pre[mid]) - median * (r + 1 - mid);
                if (cost <= k) {
                    break;
                }
                l++;
            }
            best = Math.max(best, r - l + 1);
        }
        return best;
    }
}
