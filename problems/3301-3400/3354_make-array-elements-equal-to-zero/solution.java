class Solution {

    public int countValidSelections(int[] nums) {
        // The constraints are tiny, so replay the process literally: for
        // every zero cell walk both directions on a scratch copy. A zero
        // cell advances curr; a positive cell is decremented and flips the
        // direction before the step. A selection counts when the walk
        // leaves the array with every value at zero.
        int total = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                if (finishes(nums, i, 1)) {
                    total++;
                }
                if (finishes(nums, i, -1)) {
                    total++;
                }
            }
        }
        return total;
    }

    private boolean finishes(int[] nums, int start, int step) {
        int[] cells = nums.clone();
        int curr = start;
        while (curr >= 0 && curr < cells.length) {
            if (cells[curr] == 0) {
                curr += step;
            } else {
                cells[curr] -= 1;
                step = -step;
                curr += step;
            }
        }
        for (int cell : cells) {
            if (cell != 0) {
                return false;
            }
        }
        return true;
    }
}
