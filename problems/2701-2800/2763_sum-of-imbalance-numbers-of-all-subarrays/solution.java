class Solution {

    public int sumImbalanceNumbers(int[] nums) {
        int n = nums.length;
        long total = 0;
        for (int i = 0; i < n; i++) {
            // Seed with the single-element window: its imbalance is 0.
            boolean[] seen = new boolean[n + 2];
            seen[nums[i]] = true;
            int cur = 0;
            for (int j = i + 1; j < n; j++) {
                int v = nums[j];
                if (!seen[v]) {
                    boolean lo = seen[v - 1];
                    boolean hi = seen[v + 1];
                    if (lo && hi) {
                        cur--;
                    } else if (!lo && !hi) {
                        cur++;
                    }
                    seen[v] = true;
                }
                total += cur;
            }
        }
        return (int) total;
    }
}
