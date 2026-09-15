import java.util.HashMap;
import java.util.Map;

class Solution {

    // An operation always consumes one x and one k - x, so the answer
    // depends only on how often each value occurs. For x below its
    // complement the pair count is capped by the scarcer side, giving
    // min(count(x), count(k - x)); when k is even, x = k / 2 is its own
    // complement and pairs with itself count(x) / 2 times. Comparing x
    // with k - x directly, never summing two values, keeps every
    // intermediate inside 32 bits.
    public int maxOperations(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int value : nums) {
            count.merge(value, 1, Integer::sum);
        }
        int ops = 0;
        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            int x = entry.getKey();
            int c = entry.getValue();
            int complement = k - x;
            if (x < complement) {
                ops += Math.min(c, count.getOrDefault(complement, 0));
            } else if (x == complement) {
                ops += c / 2;
            }
        }
        return ops;
    }
}
