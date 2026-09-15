import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int minSetSize(int[] arr) {
        // A k-value set removes the sum of k frequencies; accumulate the
        // largest frequencies first until half the array is gone.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : arr) {
            counts.merge(value, 1, Integer::sum);
        }
        List<Integer> freqs = new ArrayList<>(counts.values());
        freqs.sort((a, b) -> b - a);
        int need = (arr.length + 1) / 2;
        int removed = 0;
        for (int size = 1; size <= freqs.size(); ++size) {
            removed += freqs.get(size - 1);
            if (removed >= need) {
                return size;
            }
        }
        return freqs.size();
    }
}
