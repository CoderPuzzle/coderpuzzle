import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] findLonely(int[] nums) {
        // A lonely value appears exactly once and has neither neighbour
        // x - 1 nor x + 1 present; scanning nums in order keeps the
        // output in first-occurrence order.
        Map<Integer, Integer> count = new HashMap<>();
        for (int x : nums) {
            count.merge(x, 1, Integer::sum);
        }
        int[] lonely = new int[nums.length];
        int size = 0;
        for (int x : nums) {
            if (count.get(x) == 1 && !count.containsKey(x - 1) && !count.containsKey(x + 1)) {
                lonely[size++] = x;
            }
        }
        return Arrays.copyOf(lonely, size);
    }
}
