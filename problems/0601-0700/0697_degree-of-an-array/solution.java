import java.util.HashMap;
import java.util.Map;

class Solution {

    public int findShortestSubArray(int[] nums) {
        // The degree is a maximum frequency, and a window reaches it only by
        // holding every copy of some value at that frequency: drop one copy
        // and that value falls short. One pass records each value's count,
        // first index, and last index; the answer is then the tightest
        // first-to-last span among the values whose count equals the degree.
        Map<Integer, Integer> count = new HashMap<>();
        Map<Integer, Integer> first = new HashMap<>();
        Map<Integer, Integer> last = new HashMap<>();
        for (int index = 0; index < nums.length; ++index) {
            int value = nums[index];
            count.merge(value, 1, Integer::sum);
            first.putIfAbsent(value, index);
            last.put(value, index);
        }
        int degree = 0;
        for (int freq : count.values()) {
            degree = Math.max(degree, freq);
        }
        int best = nums.length;
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            if (entry.getValue() == degree) {
                int value = entry.getKey();
                best = Math.min(best, last.get(value) - first.get(value) + 1);
            }
        }
        return best;
    }
}
