import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    public int minimumDeviation(int[] nums) {
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        // Normalize: odd values are doubled once — their only upward move —
        // so afterwards every element can only shrink by halving, and every
        // reachable configuration is still visited.
        int currentMin = Integer.MAX_VALUE;
        for (int v : nums) {
            int m = v % 2 == 1 ? v * 2 : v;
            heap.add(m);
            if (m < currentMin) {
                currentMin = m;
            }
        }
        // The heap yields the maximum; the minimum is tracked separately.
        // Snapshot the untouched configuration before any halving.
        int best = heap.peek() - currentMin;
        // An even maximum can still be halved; once the maximum is odd
        // nothing can grow, so the deviation can never improve again.
        while (heap.peek() % 2 == 0) {
            int half = heap.poll() / 2;
            heap.add(half);
            if (half < currentMin) {
                currentMin = half;
            }
            // Re-check max − min after each halving.
            int deviation = heap.peek() - currentMin;
            if (deviation < best) {
                best = deviation;
            }
        }
        return best;
    }
}
