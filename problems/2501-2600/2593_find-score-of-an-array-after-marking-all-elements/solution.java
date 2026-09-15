import java.util.Arrays;

class Solution {

    public long findScore(int[] nums) {
        // Visit candidates in (value, index) order once; the first
        // not-yet-marked visit of each position is exactly the statement's
        // "smallest unmarked, smallest index" pick, and its neighborhood is
        // marked on the spot, so later sorted candidates skip it naturally.
        // Chosen indices are pairwise non-adjacent, so at most ceil(n / 2)
        // values of up to 10^6 are summed — under 5 * 10^10, which is why
        // the score rides in a long.
        int n = nums.length;
        boolean[] marked = new boolean[n];
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; ++i) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> nums[a] != nums[b] ? Integer.compare(nums[a], nums[b]) : a - b);
        long score = 0;
        for (int i : order) {
            if (marked[i]) {
                continue;
            }
            score += nums[i];
            marked[i] = true;
            if (i > 0) {
                marked[i - 1] = true;
            }
            if (i + 1 < n) {
                marked[i + 1] = true;
            }
        }
        return score;
    }
}
