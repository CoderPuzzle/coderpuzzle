class Solution {

    public int smallestUniqueSubarray(int[] nums) {
        java.util.HashMap<Integer, Integer> valueCounts = new java.util.HashMap<>();
        for (int value : nums) valueCounts.merge(value, 1, Integer::sum);
        if (valueCounts.containsValue(1)) return 1;
        if (valueCounts.size() == 1) return nums.length;

        final long base = 100_003;
        final long mod1 = 10_000_019;
        final long mod2 = 10_000_079;
        int n = nums.length;
        long[] power1 = new long[n + 1],
            power2 = new long[n + 1];
        long[] prefix1 = new long[n + 1],
            prefix2 = new long[n + 1];
        power1[0] = power2[0] = 1;
        for (int i = 0; i < n; i++) {
            power1[i + 1] = (power1[i] * base) % mod1;
            power2[i + 1] = (power2[i] * base) % mod2;
            prefix1[i + 1] = (prefix1[i] * base + nums[i]) % mod1;
            prefix2[i + 1] = (prefix2[i] * base + nums[i]) % mod2;
        }
        int low = 1,
            high = n;
        while (low < high) {
            int middle = (low + high) / 2;
            if (works(middle, prefix1, prefix2, power1, power2, mod1, mod2)) high = middle;
            else low = middle + 1;
        }
        return low;
    }

    private boolean works(
        int length,
        long[] prefix1,
        long[] prefix2,
        long[] power1,
        long[] power2,
        long mod1,
        long mod2
    ) {
        java.util.HashMap<Long, Integer> frequencies = new java.util.HashMap<>();
        for (int start = 0; start + length < prefix1.length; start++) {
            int end = start + length;
            long first = (prefix1[end] - ((prefix1[start] * power1[length]) % mod1) + mod1) % mod1;
            long second = (prefix2[end] - ((prefix2[start] * power2[length]) % mod2) + mod2) % mod2;
            long key = (first << 32) ^ second;
            frequencies.merge(key, 1, Integer::sum);
        }
        for (int count : frequencies.values()) {
            if (count == 1) return true;
        }
        return false;
    }
}
