import java.util.Arrays;

class Solution {

    public int[] pairSum(int[] nums, int target) {
        // Order the positions by their values: the pair hunt can then run as
        // a converging scan, while each position rides along with its value.
        Integer[] order = new Integer[nums.length];
        for (int i = 0; i < order.length; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(nums[a], nums[b]));
        // Converging pointers over that order. A too-small total can only be
        // raised by advancing low; a too-large one only lowered by retreating
        // high -- each step retires one position as a possible member.
        int low = 0,
            high = order.length - 1;
        while (low < high) {
            int total = nums[order[low]] + nums[order[high]];
            if (total == target) {
                // The positions come out in value order; either ordering of
                // the two is accepted.
                return new int[] { order[low], order[high] };
            }
            if (total < target) {
                low++;
            } else {
                high--;
            }
        }
        // Statement promises a solution exists; empty is just the fallback.
        return new int[] {};
    }
}
