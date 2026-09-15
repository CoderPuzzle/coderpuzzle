class Solution {

    public int[] getModifiedArray(int length, int[][] updates) {
        // Record only where the running total changes: +inc at start,
        // -inc just past end. The extra slot makes end+1 safe at the
        // last index.
        long[] diff = new long[length + 1];
        for (int[] u : updates) {
            diff[u[0]] += u[2];
            diff[u[1] + 1] -= u[2];
        }
        // One prefix-sum sweep: position i sees exactly the updates whose
        // ranges still cover it.
        int[] arr = new int[length];
        long cur = 0;
        for (int i = 0; i < length; ++i) {
            cur += diff[i];
            arr[i] = (int) cur;
        }
        return arr;
    }
}
