import java.util.*;

class Solution {

    public int maxFrequency(int[] nums, int k) {
        // Operations only raise values, so an optimal equal-value group is a
        // contiguous window in sorted order, raised to its right end.
        int[] arr = nums.clone();
        Arrays.sort(arr);
        long best = 1;
        int left = 0;
        long windowSum = 0;
        for (int right = 0; right < arr.length; right++) {
            long value = arr[right];
            windowSum += value;
            // Cost = width * target - window sum, the increments needed to
            // lift everything to the right end; drop the smallest member
            // while the budget is exceeded.
            while ((long) (right - left + 1) * value - windowSum > k) {
                windowSum -= arr[left];
                left++;
            }
            // Once a length is affordable, every shorter window is too.
            best = Math.max(best, right - left + 1);
        }
        return (int) best;
    }
}
