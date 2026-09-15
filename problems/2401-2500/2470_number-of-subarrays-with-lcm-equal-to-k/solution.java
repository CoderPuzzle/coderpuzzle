class Solution {

    public int subarrayLCM(int[] nums, int k) {
        // Anchor the left endpoint and sweep right, carrying the running
        // lcm of nums[i..j]: it only ever grows (each new element can
        // raise it, never lower it). Once it exceeds k, every later lcm
        // in this sweep is larger still, so k is unreachable — break.
        // Each j where the lcm equals k is one counted subarray.
        int n = nums.length;
        int total = 0;
        for (int i = 0; i < n; i++) {
            int l = 1;
            for (int j = i; j < n; j++) {
                l = (l / gcd(l, nums[j])) * nums[j];
                if (l > k) {
                    break;
                }
                if (l == k) {
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
