class Solution {

    public int[] resultsArray(int[] nums, int k) {
        // run counts the consecutive +1 steps ending at the current index;
        // a size-k window is powered iff its last k - 1 adjacent pairs all
        // stepped up by one, i.e. run reaches k - 1 at the window's end.
        int[] results = new int[nums.length - k + 1];
        int run = 0;
        for (int i = 0; i < nums.length; i++) {
            run = i > 0 && nums[i] == nums[i - 1] + 1 ? run + 1 : 0;
            if (i >= k - 1) {
                results[i - k + 1] = run >= k - 1 ? nums[i] : -1;
            }
        }
        return results;
    }
}
