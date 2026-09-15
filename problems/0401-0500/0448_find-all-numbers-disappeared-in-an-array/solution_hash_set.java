import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int[] findDisappearedNumbers(int[] nums) {
        // The direct reading: record every value in a hash set, then walk the
        // candidate range 1..n and keep the values the set does not hold.
        // Repeats are harmless: a value already present overwrites its own
        // entry, so the set ends holding exactly the distinct values.
        Set<Integer> seen = new HashSet<>();
        for (int value : nums) {
            seen.add(value);
        }
        // The set carries no order of its own; walking the candidates in
        // increasing order is what makes the pinned ascending output free.
        List<Integer> disappeared = new ArrayList<>();
        for (int value = 1; value <= nums.length; ++value) {
            if (!seen.contains(value)) {
                disappeared.add(value);
            }
        }
        int[] result = new int[disappeared.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = disappeared.get(index);
        }
        return result;
    }
}
