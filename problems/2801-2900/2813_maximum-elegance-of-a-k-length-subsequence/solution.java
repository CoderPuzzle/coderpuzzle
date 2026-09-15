import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long findMaximumElegance(int[][] items, int k) {
        int[][] sorted = items.clone();
        // sort descending lexicographically (profit, then category)
        Arrays.sort(sorted, (a, b) -> {
            if (a[0] != b[0]) return Integer.compare(b[0], a[0]);
            return Integer.compare(b[1], a[1]);
        });
        long total = 0;
        Map<Integer, Integer> counts = new HashMap<>();
        for (int i = 0; i < k; i++) {
            total += sorted[i][0];
            counts.merge(sorted[i][1], 1, Integer::sum);
        }
        long distinct = counts.size();
        long ans = total + distinct * distinct;

        // min-heap of (profit, category) for duplicated categories among top-k;
        // the heap is never pushed to after construction, so a sorted list with
        // a moving pointer reproduces the pop order exactly.
        List<int[]> heap = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            if (counts.get(sorted[i][1]) > 1) {
                heap.add(new int[] { sorted[i][0], sorted[i][1] });
            }
        }
        heap.sort((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            return Integer.compare(a[1], b[1]);
        });
        int h = 0;

        for (int i = k; i < sorted.length; i++) {
            int p = sorted[i][0],
                c = sorted[i][1];
            if (counts.containsKey(c)) {
                continue;
            }
            while (h < heap.size() && counts.get(heap.get(h)[1]) <= 1) {
                h++;
            }
            if (h >= heap.size()) {
                break;
            }
            int minP = heap.get(h)[0],
                minC = heap.get(h)[1];
            h++;
            total = total - minP + p;
            counts.put(minC, counts.get(minC) - 1);
            counts.put(c, 1);
            distinct += 1;
            ans = Math.max(ans, total + distinct * distinct);
        }
        return ans;
    }
}
