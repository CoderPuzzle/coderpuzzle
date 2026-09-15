import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int[] getStrongest(int[] arr, int k) {
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        int m = sorted[(arr.length - 1) / 2];
        // Size-k min-heap of {distance, value, index} whose root is the
        // weakest keeper: shortest distance, then smallest value, then
        // latest index — a later duplicate can never outrank an earlier
        // one.
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) {
                return Integer.compare(a[0], b[0]);
            }
            if (a[1] != b[1]) {
                return Integer.compare(a[1], b[1]);
            }
            return Integer.compare(b[2], a[2]);
        });
        for (int i = 0; i < arr.length; i++) {
            int[] entry = { Math.abs(arr[i] - m), arr[i], i };
            if (heap.size() < k) {
                heap.offer(entry);
                continue;
            }
            int[] root = heap.peek();
            // Replace the root only when the newcomer is strictly mightier:
            // longer distance, or larger value on a distance tie (an exact
            // duplicate never displaces an earlier index).
            if (
                entry[0] > root[0] ||
                (entry[0] == root[0] && entry[1] > root[1]) ||
                (entry[0] == root[0] && entry[1] == root[1] && entry[2] < root[2])
            ) {
                heap.poll();
                heap.offer(entry);
            }
        }
        List<int[]> survivors = new ArrayList<>(heap);
        // The heap holds the top k; emit them by original index.
        survivors.sort((a, b) -> Integer.compare(a[2], b[2]));
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = survivors.get(i)[1];
        }
        return result;
    }
}
