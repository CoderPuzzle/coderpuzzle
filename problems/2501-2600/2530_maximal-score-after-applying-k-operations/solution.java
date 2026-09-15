import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    public long maxKelements(int[] nums, int k) {
        // Greedy on the live maximum: picking anything other than the
        // largest element both gains less now and leaves that giant
        // intact, so swapping the order never helps. A reversed
        // PriorityQueue serves each max query in O(log n); every value is
        // <= 10^9 and at most k = 10^5 additions happen, so the score is
        // <= 10^14 and fits comfortably in a long.
        PriorityQueue<Long> heap = new PriorityQueue<>(Collections.reverseOrder());
        for (int num : nums) {
            heap.add((long) num);
        }
        long score = 0;
        for (int op = 0; op < k; ++op) {
            long value = heap.poll();
            score += value;
            heap.add((value + 2) / 3);
        }
        return score;
    }
}
