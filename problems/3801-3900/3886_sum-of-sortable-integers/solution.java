import java.util.Arrays;

class Solution {

    public int sortableIntegers(int[] nums) {
        int n = nums.length;
        int[] ordered = nums.clone();
        Arrays.sort(ordered);
        int total = 0;
        for (int k = 1; k <= n; ++k) {
            if (n % k != 0) {
                continue;
            }
            boolean ok = true;
            for (int start = 0; start < n; start += k) {
                if (!isRotation(nums, ordered, start, k)) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                total += k;
            }
        }
        return total;
    }

    // A sequence is a cyclic rotation of the block exactly when it appears
    // inside `block + block`; a KMP scan answers that in O(k).
    private boolean isRotation(int[] nums, int[] ordered, int start, int k) {
        int[] pi = new int[k];
        for (int i = 1; i < k; ++i) {
            int j = pi[i - 1];
            while (j > 0 && ordered[start + i] != ordered[start + j]) {
                j = pi[j - 1];
            }
            if (ordered[start + i] == ordered[start + j]) {
                ++j;
            }
            pi[i] = j;
        }
        int j = 0;
        for (int i = 0; i < 2 * k; ++i) {
            int value = nums[start + (i % k)];
            while (j > 0 && value != ordered[start + j]) {
                j = pi[j - 1];
            }
            if (value == ordered[start + j]) {
                ++j;
            }
            if (j == k) {
                return true;
            }
        }
        return false;
    }
}
