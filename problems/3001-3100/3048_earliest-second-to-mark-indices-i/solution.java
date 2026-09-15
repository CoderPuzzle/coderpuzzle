class Solution {

    public int earliestSecondToMarkIndices(int[] nums, int[] changeIndices) {
        int lo = 1;
        int hi = changeIndices.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (canMark(nums, changeIndices, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return canMark(nums, changeIndices, lo) ? lo : -1;
    }

    private boolean canMark(int[] nums, int[] changeIndices, int t) {
        int n = nums.length;
        int[] last = new int[n];
        for (int s = 1; s <= t; s++) {
            last[changeIndices[s - 1] - 1] = s;
        }
        long need = 0;
        int marked = 0;
        for (int s = 1; s <= t; s++) {
            int i = changeIndices[s - 1] - 1;
            if (last[i] == s) {
                need += nums[i];
                marked++;
                if (need > s - marked) {
                    return false;
                }
            }
        }
        return marked == n;
    }
}
