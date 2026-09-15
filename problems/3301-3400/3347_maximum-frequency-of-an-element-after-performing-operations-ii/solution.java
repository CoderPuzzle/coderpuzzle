import java.util.Arrays;

class Solution {

    public int maxFrequency(int[] nums, int k, int numOperations) {
        // A target v collects every element in [v-k, v+k]: elements already
        // equal to v cost nothing, any other costs one operation, and
        // surplus operations can always be spent as +0 elsewhere because
        // numOperations <= n. So the best frequency at v is
        // min(window(v), count(v) + numOperations). Values reach 1e9, far
        // too wide to sweep, so only breakpoints are tried: if the optimum
        // falls off an element, its window's smallest element x can slide
        // the target to x + k without losing anyone, so v = nums[i] and
        // v = nums[i] + k always contain an optimum; nums[i] - k is the
        // symmetric guard. Window bounds reach 3e9, past 32 bits, so the
        // binary-search limits run in long.
        Arrays.sort(nums);
        int best = 0;
        for (int x : nums) {
            for (long v : new long[] { (long) x - k, x, (long) x + k }) {
                int window = upperBound(nums, v + k) - lowerBound(nums, v - k);
                int exact = upperBound(nums, v) - lowerBound(nums, v);
                best = Math.max(best, Math.min(window, exact + numOperations));
            }
        }
        return best;
    }

    private int lowerBound(int[] nums, long limit) {
        int lo = 0,
            hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] < limit) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    private int upperBound(int[] nums, long limit) {
        int lo = 0,
            hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] <= limit) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
