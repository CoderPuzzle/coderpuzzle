import java.util.Collections;
import java.util.PriorityQueue;

class Solution {

    public int halveArray(int[] nums) {
        double total = 0;
        // reverse order: PriorityQueue is a min-heap by default, we need the max
        PriorityQueue<Double> pq = new PriorityQueue<>(Collections.reverseOrder());
        for (int x : nums) {
            pq.add((double) x);
            total += x;
        }
        // track the remaining reduction needed instead of re-summing each step
        double target = total / 2.0;
        int ops = 0;
        while (target > 0) {
            // greedy: halving the current maximum removes the most sum per op
            double largest = pq.poll();
            double half = largest / 2.0;
            target -= half;
            // the half may still be the max and get halved again
            pq.add(half);
            ops++;
        }
        return ops;
    }
}
