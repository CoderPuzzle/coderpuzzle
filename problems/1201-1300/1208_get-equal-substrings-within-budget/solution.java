class Solution {

    public int equalSubstring(String s, String t, int maxCost) {
        // cost[i] = |s[i] - t[i]|; find the longest subarray of costs whose
        // sum stays at most maxCost. A sliding window keeps one pass.
        int n = s.length();
        int[] costs = new int[n];
        for (int i = 0; i < n; ++i) {
            costs[i] = Math.abs(s.charAt(i) - t.charAt(i));
        }
        int left = 0;
        int windowCost = 0;
        int best = 0;
        for (int right = 0; right < n; ++right) {
            windowCost += costs[right];
            // Non-negative costs: shrink from the left until affordable.
            while (windowCost > maxCost) {
                windowCost -= costs[left++];
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
