import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] longestCommonSubsequence(int[][] arrays) {
        // Each array is strictly increasing, so a value appears at most once
        // per array; it is common to all arrays exactly when it is counted
        // arrays.length times. Values are bounded by 1..100, so a fixed-size
        // count array replaces the map and yields ascending order for free.
        int[] counts = new int[101];
        for (int[] arr : arrays) {
            for (int value : arr) {
                counts[value]++;
            }
        }
        List<Integer> result = new ArrayList<>();
        for (int v = 1; v <= 100; ++v) {
            if (counts[v] == arrays.length) result.add(v);
        }
        return result.stream().mapToInt(Integer::intValue).toArray();
    }
}
