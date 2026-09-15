import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;
import java.util.Queue;

class Solution {

    public int sortArray(int[] nums, int[] pre) {
        int n = nums.length;
        int[] target = nums.clone();
        java.util.Arrays.sort(target);
        if (java.util.Arrays.equals(nums, target)) return 0;

        Queue<int[]> queue = new ArrayDeque<>();
        Map<String, Integer> distance = new HashMap<>();
        distance.put(key(nums), 0);
        queue.add(nums);
        while (!queue.isEmpty()) {
            int[] state = queue.remove();
            int current = distance.get(key(state));
            for (int length : pre) {
                int[] next = state.clone();
                for (int i = 0, j = length - 1; i < j; i++, j--) {
                    int temp = next[i];
                    next[i] = next[j];
                    next[j] = temp;
                }
                if (java.util.Arrays.equals(next, target)) return current + 1;
                String nextKey = key(next);
                if (!distance.containsKey(nextKey)) {
                    distance.put(nextKey, current + 1);
                    queue.add(next);
                }
            }
        }
        return -1;
    }

    private String key(int[] values) {
        StringBuilder builder = new StringBuilder();
        for (int value : values) {
            builder.append(value).append(',');
        }
        return builder.toString();
    }
}
