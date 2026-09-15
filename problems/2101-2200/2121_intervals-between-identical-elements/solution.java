import java.util.HashMap;
import java.util.Map;

class Solution {

    public long[] getDistances(int[] arr) {
        long[] answer = new long[arr.length];
        Map<Integer, Long> counts = new HashMap<>();
        Map<Integer, Long> sums = new HashMap<>();
        for (int index = 0; index < arr.length; index++) {
            answer[index] += (long) index * counts.getOrDefault(arr[index], 0L) - sums.getOrDefault(arr[index], 0L);
            counts.merge(arr[index], 1L, Long::sum);
            sums.merge(arr[index], (long) index, Long::sum);
        }
        counts.clear();
        sums.clear();
        for (int index = arr.length - 1; index >= 0; index--) {
            answer[index] += sums.getOrDefault(arr[index], 0L) - (long) index * counts.getOrDefault(arr[index], 0L);
            counts.merge(arr[index], 1L, Long::sum);
            sums.merge(arr[index], (long) index, Long::sum);
        }
        return answer;
    }
}
