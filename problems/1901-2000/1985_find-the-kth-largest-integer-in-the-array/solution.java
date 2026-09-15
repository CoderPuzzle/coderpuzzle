import java.util.Arrays;

class Solution {

    public String kthLargestNumber(String[] nums, int k) {
        // A string of more digits is always the larger integer, so ordering
        // by length first and lexicographically second is numeric order.
        Arrays.sort(nums, (a, b) -> a.length() != b.length() ? a.length() - b.length() : a.compareTo(b));
        return nums[nums.length - k];
    }
}
