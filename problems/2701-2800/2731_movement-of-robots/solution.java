import java.util.Arrays;

class Solution {

    public int sumDistance(int[] nums, String s, int d) {
        // Collisions only swap identities, so final positions are x +/- d.
        final long MOD = 1000000007L;
        int n = nums.length;
        long[] pos = new long[n];
        for (int i = 0; i < n; i++) {
            pos[i] = (long) nums[i] + (s.charAt(i) == 'R' ? d : -d);
        }
        Arrays.sort(pos);
        long total = 0;
        long prefix = 0;
        for (int i = 0; i < n; i++) {
            long p = pos[i];
            total += p * i - prefix;
            total %= MOD;
            prefix += p;
        }
        long ans = ((total % MOD) + MOD) % MOD;
        return (int) ans;
    }
}
