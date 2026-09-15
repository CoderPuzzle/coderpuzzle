import java.util.Comparator;
import java.util.PriorityQueue;

class Solution {

    public int lastStoneWeight(int[] stones) {
        // The game is deterministic: only fast access to the current maximum
        // is needed, which a max-heap provides.
        PriorityQueue<Integer> heap = new PriorityQueue<>(Comparator.reverseOrder());
        for (int s : stones) {
            heap.offer(s);
        }
        while (heap.size() > 1) {
            // The two heaviest stones; equal ones annihilate (nothing pushed).
            int y = heap.poll();
            int x = heap.poll();
            if (x != y) {
                heap.offer(y - x);
            }
        }
        // Empty heap means every stone paired off into equal smashings.
        return heap.isEmpty() ? 0 : heap.poll();
    }
}
