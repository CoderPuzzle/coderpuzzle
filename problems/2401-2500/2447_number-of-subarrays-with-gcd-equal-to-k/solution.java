class Solution {

    public int subarrayGCD(int[] nums, int k) {
        // Anchor the left endpoint and sweep right, carrying the running
        // gcd of nums[i..j]: it only ever shrinks (each new element can
        // lower it, never raise it). Once k stops dividing the carried
        // gcd, every later gcd divides it too, so k is unreachable —
        // break. Each j where the gcd equals k is one counted subarray.
        int n = nums.length;
        int total = 0;
        for (int i = 0; i < n; i++) {
            int g = 0;
            for (int j = i; j < n; j++) {
                g = gcd(g, nums[j]);
                if (g % k != 0) {
                    break;
                }
                if (g == k) {
                    total++;
                }
            }
        }
        return total;
    }

    private static int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
