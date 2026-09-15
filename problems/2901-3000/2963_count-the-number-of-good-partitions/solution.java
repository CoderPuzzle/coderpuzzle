import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numberOfGoodPartitions(int[] nums) {
        // A value may not straddle a cut, so every free cut sits at an index
        // that has already seen the last occurrence of every value to its
        // left; each such gap independently doubles the count, giving
        // 2^(number of gaps).
        final long MOD = 1000000007L;
        Map<Integer, Integer> last = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            last.put(nums[i], i);
        }
        long result = 1;
        int reach = 0;
        for (int i = 0; i + 1 < nums.length; i++) {
            reach = Math.max(reach, last.get(nums[i]));
            if (reach == i) {
                result = (result * 2) % MOD;
            }
        }
        return (int) result;
    }
}
