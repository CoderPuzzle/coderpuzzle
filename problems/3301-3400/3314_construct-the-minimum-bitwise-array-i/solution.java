class Solution {

    public int[] minBitwiseArray(int[] nums) {
        // a OR (a + 1) >= a + 1, so any solution for x satisfies a <= x - 1;
        // scanning candidates from 0 up, the first hit is the minimum. The
        // value a OR (a + 1) always ends in a 1 bit, hence odd, and the only
        // even prime is 2 — that entry scans to no candidate and reports -1.
        int[] ans = new int[nums.length];
        for (int i = 0; i < nums.length; ++i) {
            int found = -1;
            for (int a = 0; a < nums[i]; ++a) {
                if ((a | (a + 1)) == nums[i]) {
                    found = a;
                    break;
                }
            }
            ans[i] = found;
        }
        return ans;
    }
}
