import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxSelectedElements(int[] nums) {
        Arrays.sort(nums);
        Map<Integer, Integer> dp = new HashMap<>();
        int best = 0;
        for (int a : nums) {
            int up = Math.max(dp.getOrDefault(a + 1, 0), dp.getOrDefault(a, 0) + 1);
            int stay = Math.max(dp.getOrDefault(a, 0), dp.getOrDefault(a - 1, 0) + 1);
            dp.put(a + 1, up);
            dp.put(a, stay);
            best = Math.max(best, Math.max(up, stay));
        }
        return best;
    }
}
