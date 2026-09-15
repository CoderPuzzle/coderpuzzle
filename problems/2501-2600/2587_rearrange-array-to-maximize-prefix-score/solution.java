import java.util.Arrays;

class Solution {

    public int maxScore(int[] nums) {
        // In descending order the first k elements are always the k largest
        // values, so every prefix sum is simultaneously maximal across all
        // rearrangements. Totals reach ±10^11, hence the long accumulator.
        Arrays.sort(nums);
        long total = 0;
        int score = 0;
        // Walk the sorted array from its tail: that visits the values in
        // decreasing order without a custom comparator.
        for (int i = nums.length - 1; i >= 0; --i) {
            total += nums[i];
            if (total > 0) score++;
        }
        return score;
    }
}
