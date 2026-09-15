import java.util.*;

class Solution {

    public int mostFrequentEven(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int num : nums) {
            if (num % 2 == 0) {
                counts.merge(num, 1, Integer::sum);
            }
        }
        int bestValue = -1;
        int bestCount = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int value = entry.getKey();
            int count = entry.getValue();
            if (count > bestCount || (count == bestCount && value < bestValue)) {
                bestCount = count;
                bestValue = value;
            }
        }
        return bestValue;
    }
}
