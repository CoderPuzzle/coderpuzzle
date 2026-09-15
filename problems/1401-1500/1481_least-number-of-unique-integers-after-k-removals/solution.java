import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int findLeastNumOfUniqueInts(long[] arr, int k) {
        Map<Long, Integer> counts = new HashMap<>();
        for (long value : arr) {
            counts.merge(value, 1, Integer::sum);
        }
        List<Integer> freqs = new ArrayList<>(counts.values());
        freqs.sort(null);
        int remaining = freqs.size();
        for (int count : freqs) {
            if (k >= count) {
                k -= count;
                remaining--;
            } else {
                break;
            }
        }
        return remaining;
    }
}
