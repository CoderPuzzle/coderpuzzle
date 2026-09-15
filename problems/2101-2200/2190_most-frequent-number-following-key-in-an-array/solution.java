import java.util.HashMap;
import java.util.Map;

class Solution {

    public int mostFrequent(int[] nums, int key) {
        // Count each value that immediately follows a key occurrence and
        // take the argmax; the input guarantees a unique winner.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int i = 0; i + 1 < nums.length; ++i) {
            if (nums[i] == key) {
                counts.merge(nums[i + 1], 1, Integer::sum);
            }
        }
        int bestValue = 0;
        int bestCount = -1;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            if (entry.getValue() > bestCount) {
                bestCount = entry.getValue();
                bestValue = entry.getKey();
            }
        }
        return bestValue;
    }
}
