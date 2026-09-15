import java.util.PriorityQueue;

class Solution {

    public int minStoneSum(int[] piles, int k) {
        // Max-heap. The removal floor(p/2) is non-decreasing in p, so always
        // halving the current max is optimal: any operation on a smaller
        // pile could be swapped to the larger one without worsening the total.
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> Integer.compare(b, a));
        for (int p : piles) heap.offer(p);
        for (int i = 0; i < k; i++) {
            int top = heap.peek();
            if (top == 1) break; // floor(1/2) removes nothing: rest are no-ops
            heap.poll();
            heap.offer(top - top / 2); // push the half that remains
        }
        long total = 0;
        for (int p : heap) total += p;
        return (int) total;
    }
}
