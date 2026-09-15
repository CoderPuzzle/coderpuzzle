import java.util.PriorityQueue;

class Solution {

    public int connectSticks(int[] sticks) {
        if (sticks.length <= 1) {
            // a single stick needs no merge
            return 0;
        }
        PriorityQueue<Long> heap = new PriorityQueue<>();
        for (int s : sticks) {
            heap.add((long) s);
        }
        long total = 0;
        // Huffman-style exchange argument: a length is paid once per merge
        // above it, so always merging the two shortest is optimal
        while (heap.size() > 1) {
            long combined = heap.poll() + heap.poll();
            total += combined;
            // the combined stick re-enters the pool for later merges
            heap.add(combined);
        }
        return (int) total;
    }
}
