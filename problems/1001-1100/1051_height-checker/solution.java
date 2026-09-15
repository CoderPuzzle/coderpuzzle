import java.util.Arrays;

class Solution {

    public int heightChecker(int[] heights) {
        // The expected order is just heights sorted into non-decreasing
        // order. Compare position-by-position and count every mismatch.
        int[] expected = heights.clone();
        Arrays.sort(expected);
        int count = 0;
        for (int i = 0; i < heights.length; i++) {
            if (heights[i] != expected[i]) {
                count++;
            }
        }
        return count;
    }
}
