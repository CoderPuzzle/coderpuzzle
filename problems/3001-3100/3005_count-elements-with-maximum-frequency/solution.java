import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxFrequencyElements(int[] nums) {
        // One pass builds the value -> frequency map; every value whose
        // frequency equals the maximum contributes that many elements.
        Map<Integer, Integer> frequencies = new HashMap<>();
        for (int num : nums) {
            frequencies.merge(num, 1, Integer::sum);
        }
        int maximum = 0;
        for (int count : frequencies.values()) {
            maximum = Math.max(maximum, count);
        }
        int total = 0;
        for (int count : frequencies.values()) {
            if (count == maximum) {
                total += count;
            }
        }
        return total;
    }
}
