import java.util.HashMap;
import java.util.Map;

class Solution {

    public int majorityElement(int[] nums) {
        // The premise taken literally: the answer turns up more than n / 2
        // times, so tally every value and stop at the first tally that
        // crosses half the array.
        Map<Integer, Integer> counts = new HashMap<>();
        int half = nums.length / 2;
        for (int num : nums) {
            // merge returns the tally after adding one to it.
            int tally = counts.merge(num, 1, Integer::sum);
            // No value can be overtaken once a tally passes half: two
            // values cannot both hold more than half the positions.
            if (tally > half) {
                return num;
            }
        }
        // A majority is promised, so the sweep always returns mid-loop.
        throw new IllegalStateException("unreachable: a majority is promised");
    }
}
