import java.util.HashSet;
import java.util.Set;

class Solution {

    // Suffixes of a distinct array stay distinct, so the surviving tail is
    // nums[j:] for the smallest j whose suffix is duplicate-free. Scanning
    // right-to-left, that j is one past the first value that repeats inside
    // the tail; each operation removes 3 front elements.
    public int minimumOperations(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        int j = 0;
        for (int i = nums.length - 1; i >= 0; --i) {
            if (!seen.add(nums[i])) {
                j = i + 1;
                break;
            }
        }
        return (j + 2) / 3;
    }
}
