import java.util.Arrays;

class Solution {

    public int[] numberGame(int[] nums) {
        // Each round hands Alice the round's smallest value and Bob the next
        // smallest, but Bob appends first — so the sorted array with every
        // adjacent pair swapped is exactly arr.
        int[] arr = Arrays.copyOf(nums, nums.length);
        Arrays.sort(arr);
        for (int i = 0; i + 1 < arr.length; i += 2) {
            int tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
        }
        return arr;
    }
}
