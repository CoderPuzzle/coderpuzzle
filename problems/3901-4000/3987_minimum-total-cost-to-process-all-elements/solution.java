class Solution {

    public int minimumCost(int[] nums, int k) {
        long s = 0;
        for (int x : nums) s += x;
        long c = Math.max(0, (s + k - 1) / k - 1),
            a = c,
            b = c + 1;
        if (a % 2 == 0) a /= 2;
        else b /= 2;
        return (int) (((a % 1000000007) * (b % 1000000007)) % 1000000007);
    }
}
