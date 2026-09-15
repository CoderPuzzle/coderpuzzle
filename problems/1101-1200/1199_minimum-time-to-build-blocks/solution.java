import java.util.PriorityQueue;

class Solution {

    public int minBuildTime(int[] blocks, int split) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int block : blocks) {
            heap.add(block);
        }
        while (heap.size() > 1) {
            // Mount the two cheapest subtrees under one new split; heavier
            // work stays shallower, where the fan-out runs in parallel.
            int first = heap.poll();
            int second = heap.poll();
            heap.add(Math.max(first, second) + split);
        }
        return heap.poll();
    }
}
