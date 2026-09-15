import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    public boolean isPossible(int[] target) {
        int n = target.length;
        // With no "rest" to un-mix against, the only reachable target is [1].
        if (n == 1) {
            return target[0] == 1;
        }
        long total = 0;
        // Reverse simulation: the total strictly grows each operation, so the
        // largest element of any reachable state was necessarily written last.
        // Max-heap + `total` tracking the current array sum.
        PriorityQueue<Long> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int v : target) {
            total += v;
            pq.add((long) v);
        }
        while (true) {
            long largest = pq.poll();
            // Max is 1 => every other element (never larger) is also 1.
            if (largest == 1) {
                return true;
            }
            long rest = total - largest;
            // The last write must have exceeded the rest of the array; it
            // also catches rest == 0 before the division.
            if (largest <= rest) {
                return false;
            }
            // Batch-jump consecutive un-mixings of the same element in one
            // go: `steps` reversals leave largest mod rest biased to [1, rest],
            // avoiding one-rest-at-a-time subtraction on 1e9-scale gaps.
            long steps = (largest - 1) / rest;
            long prev = largest - steps * rest;
            pq.add(prev);
            total = rest + prev;
        }
    }
}
