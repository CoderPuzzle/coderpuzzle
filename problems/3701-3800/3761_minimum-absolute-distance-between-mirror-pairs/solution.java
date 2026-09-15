import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minMirrorPairDistance(int[] nums) {
        int best = -1;
        // Most recent index for each reversed value (-1 marks "not seen
        // yet"); a nearer supplier beats a farther one for every future
        // match, so older entries never matter again.
        Map<Integer, Integer> latest = new HashMap<>();
        for (int index = 0; index < nums.length; index++) {
            int num = nums[index];
            // Look up before recording: an index cannot pair with itself, so
            // palindromic values wait here for a genuine second occurrence.
            Integer mirror = latest.get(num);
            if (mirror != null && (best == -1 || index - mirror < best)) {
                best = index - mirror;
            }
            // Reversal peels last digits off until none remain; trailing
            // zeros drop out on their own (120 -> 21, 100 -> 1).
            int reversedValue = 0;
            for (int value = num; value > 0; value /= 10) {
                reversedValue = reversedValue * 10 + (value % 10);
            }
            latest.put(reversedValue, index);
        }
        return best;
    }
}
