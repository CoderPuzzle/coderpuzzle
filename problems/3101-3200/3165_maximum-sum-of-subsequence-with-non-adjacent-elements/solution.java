class Solution {

    private static final long MOD = 1000000007L;
    // sentinel for impossible boundary states; clamped on every merge so
    // sentinel sums cannot cascade into overflow (all valid values have
    // magnitude <= ~5e12, far above HALF)
    private static final long NEG = -(1L << 60);
    private static final long HALF = NEG / 2;

    private long[][] tree;

    public int maximumSumSubsequence(int[] nums, int[][] queries) {
        int n = nums.length;
        tree = new long[4 * n][];
        build(1, 0, n, nums);
        long answer = 0;
        for (int[] q : queries) {
            update(1, 0, n, q[0], q[1]);
            long best = Long.MIN_VALUE;
            for (int e = 0; e < 4; e++) {
                if (tree[1][e] > best) {
                    best = tree[1][e];
                }
            }
            answer = (answer + best) % MOD;
        }
        return (int) answer;
    }

    // [m00, m01, m10, m11]: [i][j] with i = leftmost taken?, j = rightmost taken?
    private long[] leaf(long x) {
        return new long[] { 0, NEG, NEG, x };
    }

    private long addClamped(long a, long b) {
        if (a < HALF || b < HALF) {
            return NEG;
        }
        return a + b;
    }

    private long[] merge(long[] left, long[] right) {
        long[] out = new long[4];
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                long b = NEG;
                for (int k = 0; k < 2; k++) {
                    for (int l = 0; l < 2; l++) {
                        if (k == 1 && l == 1) {
                            continue;
                        }
                        long val = addClamped(left[i * 2 + k], right[l * 2 + j]);
                        if (val > b) {
                            b = val;
                        }
                    }
                }
                out[i * 2 + j] = b;
            }
        }
        return out;
    }

    private void build(int node, int lo, int hi, int[] nums) {
        if (hi - lo == 1) {
            tree[node] = leaf(nums[lo]);
            return;
        }
        int mid = (lo + hi) / 2;
        build(node * 2, lo, mid, nums);
        build(node * 2 + 1, mid, hi, nums);
        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    private void update(int node, int lo, int hi, int pos, int val) {
        if (hi - lo == 1) {
            tree[node] = leaf(val);
            return;
        }
        int mid = (lo + hi) / 2;
        if (pos < mid) {
            update(node * 2, lo, mid, pos, val);
        } else {
            update(node * 2 + 1, mid, hi, pos, val);
        }
        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }
}
