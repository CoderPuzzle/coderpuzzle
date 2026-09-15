class Solution {

    public int[] popcountDepth(long[] nums, long[][] queries) {
        // Every popcount chain collapses to 1 in at most four steps for
        // values <= 10^15, so depths live in 0..4 (k may still ask for 5,
        // whose tree simply stays empty). Six Fenwick trees, one per depth
        // class, each marking the indices currently holding that depth: a
        // query is a prefix-difference on tree[k], an update is two point
        // flips. All loops are iterative, and every count is <= n, so
        // 32-bit answers are safe while values ride in 64-bit.
        int n = nums.length;
        int[][] trees = new int[6][n + 1];
        for (int i = 0; i < n; ++i) {
            add(trees, depth(nums[i]), i + 1, 1);
        }
        int count = 0;
        for (long[] q : queries) {
            if (q[0] == 1) ++count;
        }
        int[] answer = new int[count];
        int ai = 0;
        for (long[] q : queries) {
            if (q[0] == 1) {
                int k = (int) q[3];
                answer[ai++] = pref(trees, k, (int) q[2] + 1) - pref(trees, k, (int) q[1]);
            } else {
                int idx = (int) q[1];
                add(trees, depth(nums[idx]), idx + 1, -1);
                nums[idx] = q[2];
                add(trees, depth(nums[idx]), idx + 1, 1);
            }
        }
        return answer;
    }

    private static int depth(long x) {
        int d = 0;
        while (x > 1) {
            x = Long.bitCount(x);
            ++d;
        }
        return d;
    }

    private static void add(int[][] trees, int k, int i, int delta) {
        for (; i < trees[k].length; i += i & -i) {
            trees[k][i] += delta;
        }
    }

    private static int pref(int[][] trees, int k, int i) {
        int s = 0;
        for (; i > 0; i -= i & -i) {
            s += trees[k][i];
        }
        return s;
    }
}
