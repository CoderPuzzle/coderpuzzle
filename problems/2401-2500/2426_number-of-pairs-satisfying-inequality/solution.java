class Solution {

    public long numberOfPairs(int[] nums1, int[] nums2, int diff) {
        int n = nums1.length;
        long[] values = new long[n];
        long lo = Long.MAX_VALUE,
            hi = Long.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            values[i] = (long) nums1[i] - nums2[i];
            lo = Math.min(lo, values[i]);
            hi = Math.max(hi, values[i]);
        }
        int size = (int) (hi - lo + 1);
        long[] tree = new long[size + 1];
        long count = 0;
        for (int i = 0; i < n; i++) {
            long target = values[i] + diff;
            if (target >= lo) {
                int index = (int) (Math.min(target, hi) - lo) + 1;
                for (; index > 0; index -= index & -index) count += tree[index];
            }
            int index = (int) (values[i] - lo) + 1;
            for (; index <= size; index += index & -index) tree[index] += 1;
        }
        return count;
    }
}
