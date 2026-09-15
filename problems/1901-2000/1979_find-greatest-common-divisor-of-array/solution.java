class Solution {

    public int findGCD(int[] nums) {
        int mn = nums[0];
        int mx = nums[0];
        for (int value : nums) {
            mn = Math.min(mn, value);
            mx = Math.max(mx, value);
        }
        while (mx != 0) {
            int t = mn % mx;
            mn = mx;
            mx = t;
        }
        return mn;
    }
}
