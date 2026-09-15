import java.util.Arrays;

class Solution {

    public int numberOfPoints(int[][] nums) {
        // Sorted by start point (ascending), a car only gains coverage past
        // the rightmost point counted so far — add its uncovered suffix
        // there and extend that reach.
        Arrays.sort(nums, (a, b) -> Integer.compare(a[0], b[0]));
        int total = 0;
        int reach = 0;
        for (int[] car : nums) {
            int start = car[0];
            int end = car[1];
            if (end > reach) {
                total += end - Math.max(start, reach + 1) + 1;
                reach = end;
            }
        }
        return total;
    }
}
