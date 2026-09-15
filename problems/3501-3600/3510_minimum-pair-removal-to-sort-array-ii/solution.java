import java.util.PriorityQueue;

class Solution {

    // Simulate with a doubly linked list over the original indices and a
    // min-heap of (sum, left, right). A pair is valid only if its left node
    // is still alive and still points at its recorded right neighbour; stale
    // entries are discarded when popped. A "bad count" of adjacent descents
    // tells us when the array is non-decreasing.
    public int minimumPairRemoval(int[] nums) {
        int n = nums.length;
        long[] val = new long[n];
        for (int i = 0; i < n; i++) {
            val[i] = nums[i];
        }
        int[] prev = new int[n];
        int[] nxt = new int[n];
        for (int i = 0; i < n; i++) {
            prev[i] = i - 1;
            nxt[i] = i + 1;
        }
        nxt[n - 1] = -1;
        boolean[] alive = new boolean[n];
        java.util.Arrays.fill(alive, true);
        int bad = 0;
        for (int i = 0; i < n - 1; i++) {
            if (val[i] > val[nxt[i]]) {
                bad++;
            }
        }
        if (bad == 0) {
            return 0;
        }
        PriorityQueue<long[]> heap = new PriorityQueue<>((x, y) -> {
            if (x[0] != y[0]) {
                return Long.compare(x[0], y[0]);
            }
            return Long.compare(x[1], y[1]);
        });
        for (int i = 0; i < n - 1; i++) {
            heap.add(new long[] { val[i] + val[i + 1], i, i + 1 });
        }
        int ops = 0;
        while (bad > 0) {
            long[] top = heap.poll();
            int a = (int) top[1];
            int b = (int) top[2];
            if (!alive[a] || nxt[a] != b || val[a] + val[b] != top[0]) {
                continue;
            }
            int pa = prev[a];
            int nb = nxt[b];
            // Folding b into a replaces the three adjacencies (pa,a), (a,b)
            // and (b,nb) with (pa,a) and (a,nb), so adjust bad around them.
            if (pa != -1 && val[pa] > val[a]) {
                bad--;
            }
            if (val[a] > val[b]) {
                bad--;
            }
            if (nb != -1 && val[b] > val[nb]) {
                bad--;
            }
            val[a] += val[b];
            alive[b] = false;
            nxt[a] = nb;
            if (nb != -1) {
                prev[nb] = a;
            }
            if (pa != -1 && val[pa] > val[a]) {
                bad++;
            }
            if (nb != -1 && val[a] > val[nb]) {
                bad++;
            }
            ops++;
            if (bad == 0) {
                break;
            }
            if (pa != -1) {
                heap.add(new long[] { val[pa] + val[a], pa, a });
            }
            if (nb != -1) {
                heap.add(new long[] { val[a] + val[nb], a, nb });
            }
        }
        return ops;
    }
}
