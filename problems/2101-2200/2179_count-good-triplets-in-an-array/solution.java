class Solution {

    public long goodTriplets(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int[] pos2 = new int[n];
        for (int i = 0; i < n; i++) {
            pos2[nums2[i]] = i;
        }

        long[] tree = new long[n + 1]; // Fenwick tree over positions in nums2

        long answer = 0;
        for (int i = 0; i < n; i++) {
            int value = nums1[i];
            int p = pos2[value];
            long left = prefixSum(tree, n, p - 1); // values before value in nums1 and in nums2
            // values after value in both arrays
            long right = (long) (n - 1 - p) - (i - left);
            answer += left * right;
            add(tree, n, p, 1);
        }
        return answer;
    }

    private void add(long[] tree, int n, int i, int delta) {
        i += 1;
        while (i <= n) {
            tree[i] += delta;
            i += i & -i;
        }
    }

    /** Sum over indices 0..i inclusive; returns 0 when i < 0. */
    private long prefixSum(long[] tree, int n, int i) {
        if (i < 0) {
            return 0;
        }
        i += 1;
        long total = 0;
        while (i > 0) {
            total += tree[i];
            i -= i & -i;
        }
        return total;
    }
}
