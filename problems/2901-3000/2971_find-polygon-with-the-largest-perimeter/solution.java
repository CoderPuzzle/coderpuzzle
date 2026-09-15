import java.util.Arrays;

class Solution {

    public long largestPerimeter(int[] nums) {
        Arrays.sort(nums);
        long total = 0;
        for (int x : nums) total += x;
        // Try candidate longest sides from the largest down; stop at i == 2 so
        // at least three sides remain. The first prefix that closes wins.
        for (int i = nums.length - 1; i > 1; i--) {
            // A multiset forms a polygon iff the largest side is smaller than
            // the sum of all the others.
            if (total - nums[i] > nums[i]) return total;
            // This largest side is hopeless: the smaller sides can never
            // outweigh it, so discard it and try the next candidate.
            total -= nums[i];
        }
        return -1;
    }
}
