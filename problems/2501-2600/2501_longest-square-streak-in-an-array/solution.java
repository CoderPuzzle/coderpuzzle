import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int longestSquareStreak(int[] nums) {
        // A sorted streak always steps v -> v*v, so scanning the distinct
        // values ascending makes each value extend at most one chain: the
        // one ending at its integer square root, when that root is itself
        // present. Roots stay below 317, so squaring them cannot overflow.
        int[] values = Arrays.copyOf(nums, nums.length);
        Arrays.sort(values);
        Map<Integer, Integer> length = new HashMap<>();
        int longest = 0;
        for (int i = 0; i < values.length; ++i) {
            int value = values[i];
            if (i > 0 && values[i - 1] == value) continue;
            int root = (int) Math.round(Math.sqrt(value));
            Integer previous = length.get(root);
            int len = previous != null && (long) root * root == value ? previous + 1 : 1;
            length.put(value, len);
            longest = Math.max(longest, len);
        }
        return longest >= 2 ? longest : -1;
    }
}
