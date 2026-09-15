class BookMyShow {

    private final int n;
    private final int m;
    private final int[] remaining;
    private final long[] sums;
    private final int[] maxs;

    public BookMyShow(int n, int m) {
        this.n = n;
        this.m = m;
        this.remaining = new int[n];
        java.util.Arrays.fill(remaining, m);
        this.sums = new long[4 * n];
        this.maxs = new int[4 * n];
        if (n > 0) {
            build(1, 0, n - 1);
        }
    }

    private void build(int node, int lo, int hi) {
        if (lo == hi) {
            sums[node] = remaining[lo];
            maxs[node] = remaining[lo];
            return;
        }
        int mid = (lo + hi) >>> 1;
        build(2 * node, lo, mid);
        build(2 * node + 1, mid + 1, hi);
        pull(node);
    }

    private void pull(int node) {
        sums[node] = sums[2 * node] + sums[2 * node + 1];
        maxs[node] = Math.max(maxs[2 * node], maxs[2 * node + 1]);
    }

    private void update(int node, int lo, int hi, int index, int value) {
        if (lo == hi) {
            remaining[index] = value;
            sums[node] = value;
            maxs[node] = value;
            return;
        }
        int mid = (lo + hi) >>> 1;
        if (index <= mid) {
            update(2 * node, lo, mid, index, value);
        } else {
            update(2 * node + 1, mid + 1, hi, index, value);
        }
        pull(node);
    }

    private long rangeSum(int node, int lo, int hi, int left, int right) {
        if (right < lo || hi < left) {
            return 0;
        }
        if (left <= lo && hi <= right) {
            return sums[node];
        }
        int mid = (lo + hi) >>> 1;
        return rangeSum(2 * node, lo, mid, left, right) + rangeSum(2 * node + 1, mid + 1, hi, left, right);
    }

    /** Smallest index in [left, right] with remaining >= k, or -1. */
    private int firstAtLeast(int node, int lo, int hi, int left, int right, int k) {
        if (right < lo || hi < left || maxs[node] < k) {
            return -1;
        }
        if (lo == hi) {
            return lo;
        }
        int mid = (lo + hi) >>> 1;
        int found = firstAtLeast(2 * node, lo, mid, left, right, k);
        if (found != -1) {
            return found;
        }
        return firstAtLeast(2 * node + 1, mid + 1, hi, left, right, k);
    }

    public int[] gather(int k, int maxRow) {
        int row = firstAtLeast(1, 0, n - 1, 0, maxRow, k);
        if (row == -1) {
            return new int[0];
        }
        int column = m - remaining[row];
        update(1, 0, n - 1, row, remaining[row] - k);
        return new int[] { row, column };
    }

    public boolean scatter(int k, int maxRow) {
        if (rangeSum(1, 0, n - 1, 0, maxRow) < k) {
            return false;
        }
        int row = 0;
        while (k > 0) {
            row = firstAtLeast(1, 0, n - 1, row, maxRow, 1);
            int take = Math.min(remaining[row], k);
            k -= take;
            update(1, 0, n - 1, row, remaining[row] - take);
            row++;
        }
        return true;
    }
}
