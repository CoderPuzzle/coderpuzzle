import java.util.PriorityQueue;

class Solution {

    public int minOperations(int[] nums, int k) {
        PriorityQueue<Long> heap = new PriorityQueue<>();
        for (int x : nums) heap.add((long) x);
        int operations = 0;
        // Each operation must consume the two smallest values, so the process
        // is fully deterministic once the array sits in a min-heap.
        // Done when the minimum reaches k (then every element has) or fewer
        // than two elements remain.
        while (heap.size() >= 2 && heap.peek() < k) {
            long x = heap.poll();
            long y = heap.poll();
            // x is the smaller pop by heap order, so this is min*2 + max.
            heap.add(x * 2 + y);
            operations++;
        }
        return operations;
    }
}
