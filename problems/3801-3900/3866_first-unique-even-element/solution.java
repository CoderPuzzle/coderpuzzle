import java.util.HashMap;
import java.util.Map;

class Solution {

    public int firstUniqueEven(int[] nums) {
        // A value qualifies only when it is even and its count in nums is
        // exactly one. Counting all values first turns each "is this the
        // first unique even?" test into a constant-time lookup, so a single
        // left-to-right scan over nums returns the earliest match.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.put(value, counts.getOrDefault(value, 0) + 1);
        }
        for (int value : nums) {
            if (value % 2 == 0 && counts.get(value) == 1) {
                return value;
            }
        }
        return -1;
    }
}
