import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] findOriginalArray(int[] changed) {
        if (changed.length % 2 == 1) {
            return new int[] {};
        }

        Arrays.sort(changed);
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : changed) {
            counts.put(value, counts.getOrDefault(value, 0) + 1);
        }

        int[] original = new int[changed.length / 2];
        int size = 0;
        for (int value : changed) {
            int remaining = counts.get(value);
            if (remaining == 0) {
                continue;
            }
            counts.put(value, remaining - 1);
            int doubled = value * 2;
            int doubledRemaining = counts.getOrDefault(doubled, 0);
            if (doubledRemaining == 0) {
                return new int[] {};
            }
            counts.put(doubled, doubledRemaining - 1);
            original[size++] = value;
        }
        return original;
    }
}
