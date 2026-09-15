import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] recoverArray(int[] nums) {
        int[] values = nums.clone();
        Arrays.sort(values);
        int targetLength = values.length / 2;
        for (int candidateIndex = 1; candidateIndex < values.length; candidateIndex++) {
            int difference = values[candidateIndex] - values[0];
            if (difference <= 0 || difference % 2 != 0) {
                continue;
            }

            Map<Integer, Integer> counts = new HashMap<>();
            for (int value : values) {
                counts.put(value, counts.getOrDefault(value, 0) + 1);
            }
            int[] recovered = new int[targetLength];
            int size = 0;
            for (int lower : values) {
                if (counts.getOrDefault(lower, 0) == 0) {
                    continue;
                }
                int higher = lower + difference;
                if (counts.getOrDefault(higher, 0) == 0) {
                    break;
                }
                counts.put(lower, counts.get(lower) - 1);
                counts.put(higher, counts.get(higher) - 1);
                recovered[size++] = lower + difference / 2;
            }
            if (size == targetLength) {
                return recovered;
            }
        }
        return new int[0];
    }
}
