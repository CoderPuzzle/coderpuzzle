import java.util.HashMap;
import java.util.Map;

class Solution {

    public int duplicateNumbersXOR(int[] nums) {
        // One pass with a value -> count tally; values seen exactly twice
        // contribute to the XOR. XOR is its own inverse and self-canceling,
        // so values occurring once must be excluded by the count, not
        // folded in blindly. Values are bounded by 50 here; an int suffices.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.merge(value, 1, Integer::sum);
        }
        int answer = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == 2) {
                answer ^= entry.getKey();
            }
        }
        return answer;
    }
}
