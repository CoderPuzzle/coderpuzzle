import java.util.PriorityQueue;

// Layer one-counts live in an array beside a max-heap of (count, x)
// pairs; every count change pushes a fresh pair, so the top always
// holds the largest live count with ties broken toward the larger
// index, and pairs left stale by later changes are discarded only when
// they surface at the top. The cell grid answers set and unset in O(1)
// and keeps repeated sets or unsets from skewing the counts. Each call
// costs O(log) heap work.
class Matrix3D {

    private final int[] counts;
    private final boolean[][][] cells;
    // Negated pairs under a min-heap: the top is the largest count,
    // ties broken toward the largest index.
    private final PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

    public Matrix3D(int n) {
        counts = new int[n];
        cells = new boolean[n][n][n];
        for (int x = 0; x < n; ++x) heap.offer(new int[] { 0, -x });
    }

    public void setCell(int x, int y, int z) {
        if (cells[x][y][z]) return;
        cells[x][y][z] = true;
        ++counts[x];
        heap.offer(new int[] { -counts[x], -x });
    }

    public void unsetCell(int x, int y, int z) {
        if (!cells[x][y][z]) return;
        cells[x][y][z] = false;
        --counts[x];
        heap.offer(new int[] { -counts[x], -x });
    }

    public int largestMatrix() {
        // The live pair of the true maximum is always present, so the
        // stale entries above it run out.
        while (heap.peek()[0] != -counts[-heap.peek()[1]]) heap.poll();
        return -heap.peek()[1];
    }
}
