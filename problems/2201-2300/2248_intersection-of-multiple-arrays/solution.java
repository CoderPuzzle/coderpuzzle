import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] intersection(int[][] nums) {
        // Count how many arrays contain each value; a value present in
        // every array (nums[i] holds distinct values) is counted exactly
        // nums.length times, and the statement asks for those values
        // sorted ascending.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int[] arr : nums) {
            for (int v : arr) {
                counts.merge(v, 1, Integer::sum);
            }
        }
        List<Integer> result = new ArrayList<>();
        for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
            if (e.getValue() == nums.length) {
                result.add(e.getKey());
            }
        }
        result.sort(null);
        return result.stream().mapToInt(Integer::intValue).toArray();
    }
}
