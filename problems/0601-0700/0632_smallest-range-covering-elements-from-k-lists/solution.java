import java.util.PriorityQueue;

class Solution {

    public int[] smallestRange(int[][] nums) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });
        // Seed the heap with every list's head; the k-way merge sweeps candidate
        // ranges in order as the selection's minimum advances.
        int curMax = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            heap.offer(new int[] { nums[i][0], i, 0 });
            if (nums[i][0] > curMax) curMax = nums[i][0];
        }
        long bestLo = 0,
            bestHi = 0;
        boolean have = false;
        while (true) {
            int[] top = heap.poll();
            int lo = top[0],
                i = top[1],
                j = top[2];
            // [lo, curMax] covers all k lists: prefer smaller width, then
            // the smaller left endpoint on ties.
            if (!have || curMax - lo < bestHi - bestLo || (curMax - lo == bestHi - bestLo && lo < bestLo)) {
                bestLo = lo;
                bestHi = curMax;
                have = true;
            }
            if (j + 1 == nums[i].length) {
                // The popped list is exhausted: no later selection can still
                // include it, so every further candidate would be worse.
                return new int[] { (int) bestLo, (int) bestHi };
            }
            int nxt = nums[i][j + 1];
            // The next element may raise the tracked maximum.
            if (nxt > curMax) curMax = nxt;
            heap.offer(new int[] { nxt, i, j + 1 });
        }
    }
}
