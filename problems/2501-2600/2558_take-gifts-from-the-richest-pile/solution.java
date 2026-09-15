import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    public long pickGifts(int[] gifts, int k) {
        // Live-maximum simulation: each second the richest pile shrinks
        // to floor(sqrt(value)), which only ever lowers it, so a
        // reversed PriorityQueue replays the process; ties change
        // nothing because any pick order yields the same multiset. The
        // answer is bounded by 10^3 piles * 10^9 gifts = 10^12, so it
        // needs a long; sqrt guesses are corrected with 64-bit squares.
        PriorityQueue<Long> heap = new PriorityQueue<>(Collections.reverseOrder());
        for (int gift : gifts) {
            heap.add((long) gift);
        }
        for (int s = 0; s < k; ++s) {
            long value = heap.poll();
            long root = (long) Math.sqrt(value);
            while (root * root > value) --root;
            while ((root + 1) * (root + 1) <= value) ++root;
            heap.add(root);
        }
        long total = 0;
        for (long v : heap) {
            total += v;
        }
        return total;
    }
}
