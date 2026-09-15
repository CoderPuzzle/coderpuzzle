import java.util.PriorityQueue;

class Solution {

    private int[][] maxTable, minTable;
    private int[] logTable;

    public long maxTotalValue(int[] nums, int k) {
        int n = nums.length;
        // Sparse tables: level j holds the max/min of every window of
        // length 2^j, each derived from the previous level in one pass.
        int levels = 32 - Integer.numberOfLeadingZeros(n);
        maxTable = new int[levels][];
        minTable = new int[levels][];
        maxTable[0] = nums.clone();
        minTable[0] = nums.clone();
        for (int j = 1; j < levels; j++) {
            int half = 1 << (j - 1);
            int len = n - (1 << j) + 1;
            maxTable[j] = new int[len];
            minTable[j] = new int[len];
            for (int i = 0; i < len; i++) {
                maxTable[j][i] = Math.max(maxTable[j - 1][i], maxTable[j - 1][i + half]);
                minTable[j][i] = Math.min(minTable[j - 1][i], minTable[j - 1][i + half]);
            }
        }
        logTable = new int[n + 1];
        for (int i = 2; i <= n; i++) {
            logTable[i] = logTable[i >> 1] + 1;
        }
        // Row l is non-increasing as r shrinks toward l, so the heap merges
        // n sorted rows and always holds each row's largest unseen entry.
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(b[0], a[0]));
        for (int l = 0; l < n; l++) {
            heap.add(new long[] { spread(l, n - 1), l, n - 1 });
        }
        long total = 0;
        for (int picked = 0; picked < k; picked++) {
            long[] top = heap.poll();
            int l = (int) top[1];
            int r = (int) top[2];
            total += top[0];
            if (r > l) {
                heap.add(new long[] { spread(l, r - 1), l, r - 1 });
            }
        }
        return total;
    }

    private long spread(int l, int r) {
        // Two overlapping power-of-two windows cover [l, r].
        int j = logTable[r - l + 1];
        int low = 1 << j;
        return (
            (long) Math.max(maxTable[j][l], maxTable[j][r - low + 1]) -
            Math.min(minTable[j][l], minTable[j][r - low + 1])
        );
    }
}
