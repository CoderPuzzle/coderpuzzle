import java.util.Arrays;

class Solution {

    public long maximumTotalSum(int[] maximumHeight) {
        // Sorting descending makes the distinctness bound exact position by
        // position: once the previous tower took height prev, no later tower
        // may take anything above prev - 1, so each assigned height is
        // min(cap, prev - 1); falling below 1 means some prefix demands more
        // distinct positive integers than exist up to the largest cap, and
        // no rearrangement helps. Totals reach 10^14, so the accumulator
        // widens to long.
        Arrays.sort(maximumHeight);
        long total = 0;
        long prev = Long.MAX_VALUE;
        for (int i = maximumHeight.length - 1; i >= 0; i--) {
            long height = Math.min((long) maximumHeight[i], prev - 1);
            if (height < 1) {
                return -1;
            }
            total += height;
            prev = height;
        }
        return total;
    }
}
