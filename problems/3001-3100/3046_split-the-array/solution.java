import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean isPossibleToSplit(int[] nums) {
        Map<Integer, Integer> frequencies = new HashMap<>();
        for (int num : nums) {
            frequencies.merge(num, 1, Integer::sum);
            if (frequencies.get(num) > 2) {
                return false;
            }
        }
        return true;
    }
}
