import java.util.Arrays;

class Solution {

    public int specialArray(int[] nums) {
        // Sort descending: for candidate x = i, the i-th largest element
        // must still be >= i while the next one drops below it (or i is
        // the last position), which is exactly "i elements are >= i".
        int n = nums.length;
        Integer[] sorted = new Integer[n];
        for (int i = 0; i < n; ++i) sorted[i] = nums[i];
        Arrays.sort(sorted, (a, b) -> b - a);
        for (int i = 1; i <= n; ++i) {
            if (sorted[i - 1] >= i && (i == n || sorted[i] < i)) return i;
        }
        // Every element is non-negative, so x = 0 would need an empty
        // array; nothing else worked, so the array is not special.
        return -1;
    }
}
