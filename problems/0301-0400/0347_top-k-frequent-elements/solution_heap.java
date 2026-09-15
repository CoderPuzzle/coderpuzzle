import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {

    public int[] topKFrequent(int[] nums, int k) {
        // One counting pass over the array.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) {
            counts.merge(x, 1, Integer::sum);
        }
        // Size-k min-heap whose root is the weakest keeper: smallest
        // count, and among equal counts the largest value — eviction
        // order mirrors the final ranking.
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->
            a[1] != b[1] ? Integer.compare(a[1], b[1]) : Integer.compare(b[0], a[0])
        );
        for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
            int[] item = { e.getKey(), e.getValue() };
            if (heap.size() < k) {
                heap.offer(item);
                continue;
            }
            int[] root = heap.peek();
            // Replace the root only when the newcomer outranks it:
            // higher count, or equal count and smaller value.
            if (item[1] > root[1] || (item[1] == root[1] && item[0] < root[0])) {
                heap.poll();
                heap.offer(item);
            }
        }
        List<int[]> survivors = new ArrayList<>(heap);
        // Survivors are exactly the top k by (higher count, then smaller
        // value); emit them in that order.
        survivors.sort((a, b) -> a[1] != b[1] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0]));
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = survivors.get(i)[0];
        }
        return result;
    }
}
