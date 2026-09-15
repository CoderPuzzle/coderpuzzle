import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] sortByReflection(int[] nums) {
        // Reflect every value once — reverse its binary string and parse
        // it back, which drops any leading zeros the reversal produced —
        // then sort on the composite key (reflection, value) so ties break
        // by ascending original value regardless of sort stability.
        Map<Integer, Integer> reflection = new HashMap<>();
        for (int value : nums) {
            reflection.put(
                value,
                Integer.parseInt(new StringBuilder(Integer.toBinaryString(value)).reverse().toString(), 2)
            );
        }
        Integer[] boxed = new Integer[nums.length];
        for (int index = 0; index < nums.length; index++) {
            boxed[index] = nums[index];
        }
        Arrays.sort(boxed, (a, b) ->
            reflection.get(a) - reflection.get(b) != 0 ? reflection.get(a) - reflection.get(b) : a - b
        );
        int[] sorted = new int[nums.length];
        for (int index = 0; index < nums.length; index++) {
            sorted[index] = boxed[index];
        }
        return sorted;
    }
}
