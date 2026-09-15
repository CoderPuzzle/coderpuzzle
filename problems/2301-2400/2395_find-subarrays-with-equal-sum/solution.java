import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean findSubarrays(int[] nums) {
        // Sweep the n-1 length-2 window sums into a set; the first
        // repeat answers true.
        Set<Integer> seen = new HashSet<>();
        for (int i = 0; i + 1 < nums.length; ++i) {
            if (!seen.add(nums[i] + nums[i + 1])) {
                return true;
            }
        }
        return false;
    }
}
