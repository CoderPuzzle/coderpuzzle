import java.util.HashMap;
import java.util.Map;

class Solution {

    public int majorityElement(int[] nums) {
        // The guarantee taken at face value: the answer is the one value whose
        // tally passes n / 2, so count occurrences per distinct value and
        // report the first tally to cross that line.
        Map<Integer, Integer> counts = new HashMap<>();
        int half = nums.length / 2;
        for (int value : nums) {
            // merge returns the tally after adding one to it.
            int tally = counts.merge(value, 1, Integer::sum);
            // No rival can catch a tally already past half: two values cannot
            // both own more than half the positions.
            if (tally > half) {
                return value;
            }
        }
        // A majority is promised, so the sweep always returns mid-loop.
        throw new IllegalStateException("unreachable: a majority is promised");
    }
}
