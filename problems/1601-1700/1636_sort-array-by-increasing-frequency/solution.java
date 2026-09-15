import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] frequencySort(int[] nums) {
        // Count each value's frequency, then sort a boxed copy by a composite
        // key: frequency ascending, value descending on ties.
        Map<Integer, Integer> freq = new HashMap<>();
        for (int value : nums) freq.merge(value, 1, Integer::sum);

        Integer[] boxed = new Integer[nums.length];
        for (int i = 0; i < nums.length; ++i) boxed[i] = nums[i];

        Arrays.sort(boxed, (a, b) -> {
            int diff = freq.get(a) - freq.get(b);
            if (diff != 0) return diff;
            return b - a;
        });

        int[] result = new int[nums.length];
        for (int i = 0; i < nums.length; ++i) result[i] = boxed[i];
        return result;
    }
}
