class Solution {

    public long countSubarrays(int[] nums, int k) {
        int n = nums.length;
        int pos = -1;
        for (int i = 0; i < n; i++) {
            if (nums[i] == k) {
                pos = i;
                break;
            }
        }
        // balance ranges over [-n, n]; offset by n.
        long[] balance = new long[2 * n + 1];
        balance[n] = 1;
        int current = 0;
        long count = 0;
        for (int i = 0; i < n; i++) {
            int v = nums[i];
            if (v > k) current += 1;
            else if (v < k) current -= 1;
            if (i >= pos) {
                count += balance[current + n] + balance[current - 1 + n];
            } else {
                balance[current + n] += 1;
            }
        }
        return count;
    }
}
