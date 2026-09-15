import java.util.*;

class Solution {

    public int[] numberOfPairs(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int num : nums) {
            counts.merge(num, 1, Integer::sum);
        }
        int pairs = 0;
        int leftovers = 0;
        for (int count : counts.values()) {
            pairs += count / 2;
            leftovers += count % 2;
        }
        return new int[] { pairs, leftovers };
    }
}
