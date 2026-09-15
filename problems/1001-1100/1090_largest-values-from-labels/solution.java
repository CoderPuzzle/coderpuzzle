import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int largestValsFromLabels(int[] values, int[] labels, int numWanted, int useLimit) {
        // Greedy: sort items by value descending and take each one while
        // both the per-label cap and the total count allow it.
        int n = values.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> Integer.compare(values[b], values[a]));
        Map<Integer, Integer> used = new HashMap<>();
        int total = 0;
        int taken = 0;
        for (int idx : order) {
            if (taken == numWanted) break;
            int label = labels[idx];
            if (used.getOrDefault(label, 0) == useLimit) continue;
            used.put(label, used.getOrDefault(label, 0) + 1);
            total += values[idx];
            taken++;
        }
        return total;
    }
}
