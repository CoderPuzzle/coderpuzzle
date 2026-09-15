import java.util.Arrays;

class Solution {

    public int smallestDistancePair(int[] nums, int k) {
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int n = sorted.length;
        // The count is monotone in dist, so binary search the distance itself
        // over [0, max - min]; the converged value is a real pair distance.
        int lo = 0;
        int hi = sorted[n - 1] - sorted[0];
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            // At least k pairs qualify: the kth smallest is mid or smaller.
            if (countLe(sorted, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    // Pairs within dist, counted on the sorted array with two pointers:
    // j only moves forward across the whole scan (never restarts per i).
    private long countLe(int[] nums, int dist) {
        long cnt = 0;
        int j = 0;
        for (int i = 0; i < nums.length; i++) {
            while (j < nums.length && nums[j] - nums[i] <= dist) {
                j++;
            }
            // Later elements within dist of nums[i]; j - i - 1 of them.
            cnt += j - i - 1;
        }
        return cnt;
    }
}
