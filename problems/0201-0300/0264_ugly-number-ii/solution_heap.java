import java.util.HashSet;
import java.util.PriorityQueue;
import java.util.Set;

class Solution {

    public int nthUglyNumber(int n) {
        // Frontier of the generation process: a min-heap seeded with 1, so
        // the smallest not-yet-emitted ugly number is always at its top.
        // 64-bit elements: pushed multiples can overshoot the 32-bit answer.
        PriorityQueue<Long> heap = new PriorityQueue<>();
        heap.offer(1L);
        // The heap is a frontier, not a set: pushing every successor would
        // enqueue duplicates (6 = 2·3 = 3·2), so seen gates each push.
        Set<Long> seen = new HashSet<>();
        seen.add(1L);
        for (int i = 1; i < n; i++) {
            long value = heap.poll();
            for (long factor : new long[] { 2, 3, 5 }) {
                long multiple = value * factor;
                if (seen.add(multiple)) {
                    heap.offer(multiple);
                }
            }
        }
        // After n-1 pops the heap top is the n-th ugly number in order.
        return heap.peek().intValue();
    }
}
