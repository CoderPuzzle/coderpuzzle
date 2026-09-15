import java.util.Arrays;

class Solution {

    public int minMoves2(int[] nums) {
        // Each move shifts one element by one unit, so gathering everything
        // on a target t costs exactly sum |x - t| — and a sum of absolute
        // distances is minimized at the median. Pairing the sorted values
        // outermost-inward shows why: a pair pays its full gap wherever its
        // two elements meet, so any pivot between the two middles is
        // optimal, and the lower middle element is as good as any.
        Arrays.sort(nums);
        int pivot = nums[(nums.length - 1) / 2];
        // Each distance is up to 2*10^9 and there are up to 10^5 of them, so
        // the running total spans 2*10^14 — far beyond int range. It
        // accumulates as long; only the promised 32-bit answer comes back out.
        long total = 0;
        for (int value : nums) {
            total += Math.abs((long) value - pivot);
        }
        return (int) total;
    }
}
